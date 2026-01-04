import uploadOnCloudinary from "../config/cloudinary.js";
import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";


// for creating a course

export const createCourse = async (req, res) => {
    try {
        const { title, category } = req.body;
        if (!title || !category) {
            return res.status(400).json({ message: "Title and Category are required" });
        }
       

        const course = await Course.create({
            title,
            category,
             creator: req.userId

        })
          
        return res.status(201).json({ message: "Course created successfully", course });
      
    } catch (error) {
        res.status(500).json({ message: "Create Course error", error: error.message });
    }   
};

export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true })
        if(!courses){
            return res.status(404).json({message:"No published courses found"})
        }
        return res.status(200).json({message:"Published courses fetched successfully", courses});
    } catch (error) {
        res.status(500).json({ message: "Get Published Courses error", error: error.message });
    }
};


export const getCreatorCourses = async (req,res)=>{
 try{
    const userId = req.userId
    const courses = await Course.find({creator:userId})
     if(!courses){
            return res.status(404).json({message:"No published courses found"})
        }
        return res.status(200).json({message:"Creator courses fetched successfully", courses});

        
 }catch(error){
    res.status(500).json({ message: "Get Creator Courses error", error: error.message });

 }

}



export const editCourse = async (req,res)=>{
    try{
        const {courseId} = req.params
        const {title, subTitle, description ,  category,level,isPublished , price } = req.body
        let thumbnail 
        if (req.file) {
            thumbnail = await uploadOnCloudinary(req.file.path);
        } 
       
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:"Course are not found"})
        }   
        if(course.creator.toString() !== req.userId){
            return res.status(403).json({message:"You are not authorized to edit this course"})
        }

        const updatedData = {
            title,
            subTitle,
            description,
            category,
            level,
            isPublished,
            price,
            thumbnail
        };
        course = await Course.findByIdAndUpdate(courseId,updatedData,{new:true})    
        
        return res.status(200).json({message:"Course updated successfully",course}) 

    }catch(error){
        res.status(500).json({ message: "Edit Course error", error: error.message });       

    }
}

export const getCourseById = async (req,res)=>{
    try{
        const {courseId} = req.params
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:"Course are not found"})
        }   
        return res.status(200).json({message:"Course fetched successfully",course}) 

    }catch(error){
        res.status(500).json({ message: "Get Course By Id error", error: error.message });      
    }
}

export const removeCourse = async (req,res)=>{
    try{
        const {courseId} = req.params
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:"Course are not found"})
        }
        if(course.creator.toString() !== req.userId){
            return res.status(403).json({message:"You are not authorized to delete this course"})
        }
        await Course.findByIdAndDelete(courseId,{new:true} )
        return res.status(200).json({message:"Course deleted successfully"})        
    }catch(error){
        res.status(500).json({ message: "Remove Course error", error: error.message });      
    }
}



// for creating lecture


export const createLecture = async (req, res) =>{
    try {
        const {lectureTitle} = req.body
        const {courseId} = req.params
    if(lectureTitle || courseId){
        return res.status(400).json({message:"Lecture Title is required"})

    }
       
    const lecture = await Lecture.create({lectureTitle})
    const course = await Course.findById(courseId)

if(course){
    course.lectures.push(lecture._id)
    
}
 await course.populate('lectures')
await course.save()
    return res.status(201).json({message:"Lecture created successfully", lectur, course})


    } catch (error) {
        res.status(500).json({ message: "Failed to create lecture", error: error.message });
        
    }
}




export const getCourseLecture = async (req,res)=>{
try {
    const {courseId} = req.params
    const course = await Course.findById(courseId)
    if(!course){
        return res.status(404).json({message:"Course not found"})
    }
    await course.populate('lectures')
    await course.save()
    return res.status(200).json({message:"Course lectures fetched successfully",course})
    

} catch (error) {
    res.status(500).json({ message: "Failed to Get Course Lecture error", error: error.message });
    
}





}






export const editLecture = async (req,res)=>{
    try{
        const {lectureId} = req.params
        const {lectureTitle,  isPreviewFree} = req.body
        let lecture = await Lecture.findById(lectureId)
        if(!lecture){
            return res.status(404).json({message:"Lecture are not found"})
        } 

        let videoUrl
        if (req.file) {
            videoUrl = await uploadOnCloudinary(req.file.path)
            lecture.videoUrl = videoUrl
        }
        if(lectureTitle){
            lecture.lectureTitle = lectureTitle
        }
        
         lecture.isPreviewFree = isPreviewFree

        await lecture.save()
        return res.status(200).json({message:"Lecture updated successfully",lecture})   

        

        
        
    }catch(error){
        res.status(500).json({ message: "Edit Lecture error", error: error.message });       
    }   
}



export const removeLecture = async (req,res)=>{ 
    try {
        const {lectureId} = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if(!lecture){
            return res.status(404).json({message:"Lecture not found"})
        }

        await Course.updateOne(
            {lectures:lectureId},
            {$pull:{lectures:lectureId}}
        )
        return res.status(200).json({message:"Lecture deleted successfully"})


          
        

        
    } catch (error) {
        res.status(500).json({ message: "Remove Lecture error", error: error.message });
        
    }








}
   

