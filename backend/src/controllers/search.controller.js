import Course from "../models/course.model.js";


export const searchWithAi = async (req, res) => {
  try {
    const {input} = req.body
    if(!input) return res.status(400).json({message: "Input is required"})

       const course = await Course.find({
        isPublished:true,
        $or:[
            {title:{$regex:input,$options:'i'}},
            
            {subTitle:{$regex:input,$options:'i'}},
            {description:{$regex:input,$options:'i'}},
            {category:{$regex:input,$options:'i'}},
            {level:{$regex:input,$options:'i'}}

        ]});
        if(!course) return res.status(404).json({message: "Course not found"})
            return res.status(200).json({message: "Course found",course})



  } catch (error) {
    return res.status(500).json({message: "Failed to search with AI", error: error.message})   
    
  }






}