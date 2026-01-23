import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import emptyImg from "../../assets/empty.jpg";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "sonner";

import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData, setCreatorCourseData } from "../../redux/courseSlice";

const EditCourses = () => {
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(false);
  const thumb = useRef();

    const {courseId} = useParams()

    const [selectCourse, setSelectCourse] = useState(null)
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [level, setLevel] = useState("")
    const [price, setPrice] = useState(0)
    const [frontendImage, setFrontendImage] = useState(emptyImg)
    const [backendImage, setBackendImage] = useState(null)
    const [loading , setLoading] = useState(false)
    const [loading1 , setLoading1] = useState(false)
    const dispatch = useDispatch() 

    const {courseData, creatorCourseData} = useSelector(state=>state.course)



    const handleThumnail = (e) =>{
      const file = e.target.files[0]
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
    }


    const getCourseById = async () =>{
      try {
        const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}`, {withCredentials:true})
        setSelectCourse(result.data.course)
        
      } catch (error) {
         console.log(error)
      }
    }

     
    useEffect(()=>{
      if(selectCourse){
        setTitle(selectCourse.title || "")
        setSubTitle(selectCourse.subTitle || "")
        setDescription(selectCourse.description || "")
        setCategory(selectCourse.category || "")
        setLevel(selectCourse.level || "")
        setPrice(
  typeof selectCourse.price === "number" && selectCourse.price > 0
    ? selectCourse.price
    : 0
)

        
        setFrontendImage(selectCourse.thumbnail || emptyImg)    
        setIsPublished(selectCourse?.isPublished )

      }
    },[selectCourse])


     useEffect(()=>{
      getCourseById();
     },
     [])


  const handleEditCourse = async () =>{
     if (!price || price <= 0) {
  toast.error("Course price is required");
  return;
}

   
  


    setLoading(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('subTitle', subTitle)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('level', level)
    formData.append('price', price)
    if (backendImage) {
  formData.append("thumbnail", backendImage);
}



    formData.append('isPublished', isPublished)

    try {
        const result = await axios.post(serverUrl + `/api/course/editcourse/${courseId}`,formData, {withCredentials:true})
        console.log(result.data);
        const updatedData = result.data.course;
        console.log(updatedData);
        const existing = creatorCourseData?.courses ?? []
        if(updatedData.isPublished){
          const updatedCourse = existing.map(c => c._id === courseId ? updatedData : c)

          if(!existing.some(c=> c._id === courseId)){
            updatedCourse.push(updatedData)
          }
          dispatch(setCreatorCourseData({ ...creatorCourseData, courses: updatedCourse }))

          //  update  courses list
          const pubExisting = courseData?.courses ?? []
          const updatedPub = pubExisting.map(c => c._id === courseId ? updatedData : c)
          if(!pubExisting.some(c => c._id === courseId)) updatedPub.push(updatedData)
          dispatch(setCourseData({ ...courseData, courses: updatedPub }))

        } else {
          const updatedCreator = existing.map(c => c._id === courseId ? updatedData : c)
          if(!existing.some(c => c._id === courseId)) updatedCreator.push(updatedData)
          dispatch(setCreatorCourseData({ ...creatorCourseData, courses: updatedCreator }))

          // remove from published 
          const pubExisting = courseData?.courses ?? []
          const filteredPub = pubExisting.filter(c => c._id !== courseId)
          dispatch(setCourseData({ ...courseData, courses: filteredPub }))
        }

        setLoading(false)
        navigate('/edu-courses')
        toast.success("Course Updated")
      
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error(error.response.data.message)
      
    }
    
 }

 const handleRemoveCouse = async () =>{
 setLoading1(true)
 try {
  const result = await axios.delete(serverUrl + `/api/course/remove/${courseId}`,{withCredentials:true})
  console.log(result.data);

  const existing = creatorCourseData?.courses ?? []
  const filterCourse = existing.filter(c => c._id !== courseId)
   console.log(filterCourse);
  dispatch(setCreatorCourseData({ ...creatorCourseData, courses: filterCourse }))
  
  const pubExisting = courseData?.courses ?? []
  const filteredPub = pubExisting.filter(c => c._id !== courseId)
  dispatch(setCourseData({ ...courseData, courses: filteredPub }))
  setLoading1(false)
  navigate('/edu-courses')
  toast.success("Course Removed")

 } catch (error) {
  console.log(error);
  setLoading1(false)
  toast.error(error.response.data.message)


  
 }


 }


    
return (
  <div className="min-h-screen bg-[#05060b] text-white">
    <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[360px_1fr] gap-10">

      {/* LEFT – */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-sm text-white/60">
          <FaArrowLeftLong
            className="cursor-pointer hover:text-white"
            onClick={() => navigate("/edu-courses")}
          />
          Back to courses
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/10">
          <img
            src={frontendImage}
            alt=""
            className="w-full h-[220px] object-cover"
            onClick={() => thumb.current.click()}
          />

          
          <div
            onClick={() => thumb.current.click()}
            className="
              absolute inset-0
              bg-black/60
              opacity-0 hover:opacity-100
              transition
              flex flex-col items-center justify-center
              gap-2 cursor-pointer
            "
          >
            <FaEdit />
            <span className="text-sm tracking-wide">Change thumbnail</span>
          </div>
        </div>

        
        <div className="space-y-3">
          <h2 className="text-lg font-semibold leading-tight">
            {title || "Untitled course"}
          </h2>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-2 py-1 rounded-full bg-white/10">
              {category || "No category"}
            </span>
            <span className="px-2 py-1 rounded-full bg-white/10">
              {level || "No level"}
            </span>
          </div>
               <div className="text-sm text-white/60">
  ₹{price}
</div>

          
        </div>

        
        <div className="pt-4 border-t border-white/10 space-y-3">
          {!isPublished ? (
           
            <button
  onClick={() => {
    if (!price || price <= 0) {
      toast.error("Add price before publishing");
      return;
    }
    setIsPublished(prev => !prev);
  }}
>
  Publish course
</button>



          ) : (
            <button
              onClick={() => setIsPublished(prev => !prev)}
              className="
                w-full py-2 rounded-md
                border border-rose-400/30
                text-rose-400
                hover:bg-rose-400/10
              "
            >
              Unpublish course
            </button>
          )}

          <button
            onClick={handleRemoveCouse}
            className="
              w-full py-2 rounded-md
              border border-red-500/30
              text-red-400
              hover:bg-red-500/10
            "
          >
            Delete course
          </button>
        </div>
      </div>

      {/* RIGHT – PANEL */}
      <div className="rounded-2xl border border-white/10 bg-[#0b0f19] p-8">
        

        <div className="flex flex-col mb-4 gap-2 sm:flex-row sm:items-center sm:justify-between">
         <h3 className="text-base sm:text-lg font-semibold text-white">
        Course configuration
       </h3>

  <button
    onClick={() => navigate(`/createlecture/${selectCourse?._id}`)}
    className="
      self-start sm:self-auto
      text-sm sm:text-base font-medium
      text-emerald-400 hover:text-emerald-300
      transition
    "
  >
    Go to lectures →
  </button>
</div>


        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Course title"
            className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-2"
          />

          <input
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="Course subtitle"
            className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-2"
          />

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Course description"
            className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-2 resize-none"
          />

          <div className="grid sm:grid-cols-3 gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-md px-3 py-2"
            >
              <option value="">Category</option>
              <option>Web Development</option>
              <option>UI/UX</option>
              <option>App Development</option>
              <option>Ethical Hacking</option>
              <option>AI/ML</option>
              <option>Data Science</option>
              <option>Other</option>
            </select>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-md px-3 py-2"
            >
              <option value="">Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

           
            <input
  type="number"
  min={1}
  required
  value={price}
  onChange={(e) => setPrice(Number(e.target.value))}
  placeholder="₹ Price"
  className="bg-black/40 border border-white/10 rounded-md px-3 py-2"
/>




          </div>

          <div className="flex justify-end items-end gap-3 pt-6 border-t border-white/10">
            {/* <button
              onClick={() => navigate(`/createlecture/${selectCourse?._id}`)}
              className="text-sm text-emerald-500 hover:text-white"
            >
              Go to lectures →
            </button> */}
             <button
                onClick={() => navigate("/edu-courses")}
                className="px-4 py-2 rounded-md  bg-white/5 hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={handleEditCourse}
                className="
                  px-6 py-2 rounded-md
                  bg-white text-black
                  font-medium
                "
              >
                {loading ? <ClipLoader size={18} color="black" /> : "Save"}
              </button>

            <div className="flex justify-end  gap-3">
             
            </div>
          </div>
        </form>
      </div>
    </div>

    <input
      type="file"
      hidden
      ref={thumb}
      accept="image/*"
      onChange={handleThumnail}
    />
  </div>
);



  
};

export default EditCourses;
