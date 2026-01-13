import axios from "axios";
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, useParams  } from 'react-router-dom'
import { serverUrl } from "../../../App.jsx";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../../redux/lectureSlice.js";

import { toast } from "sonner";
import { FaEdit } from "react-icons/fa";

const CreateLecture = () => {

  const {courseId} = useParams()
  const navigate = useNavigate() 
  const [lectureTitle, setLectureTitle] = useState("")
  const [loading, setLoading] = useState()
  const dispatch = useDispatch()

  const {lectureData} = useSelector(state=>state.lecture)
  

  const handleCreateLecture = async () =>{

   if (!lectureTitle.trim()) {
    toast.error("Lecture title is required");
    return;
  }

   setLoading(true)
   try {
       const result = await axios.post(serverUrl + `/api/course/createlecture/${courseId}`,{lectureTitle},{withCredentials:true})
        console.log(result.data);

       

       dispatch(
  setLectureData([...(lectureData || []), result.data.lecture])
);


        setLoading(false)
        toast.success("Lecture Added ")
        setLectureTitle('')

   } catch (error) {
    console.log("Error while creating lecture:", error);
   setLoading(false)
    toast.error("Failed to create lecture",error.response.data.message)

   
   }


  }











  useEffect(()=>{
    const getCourseLecture = async () =>{
     try {
      const result = await axios.get(serverUrl + `/api/course/courselecture/${courseId}`,{withCredentials:true})
       console.log(result.data);
      dispatch(setLectureData(result.data.course.lectures))
    //  dispatch(setLectureData(result.data.lectures))



     } catch (error) {
      console.log("Error while fetching course lectures:", error);

     }


    }
    getCourseLecture();

  },[]) 


return (
  <div className="min-h-screen bg-[#0b0d12] text-white px-4 py-10">
    <div className="max-w-5xl mx-auto space-y-10">

      {/* HEADER */}
      <div className="flex items-start gap-4">
        <FaArrowLeftLong
          onClick={() => navigate(`/editcourses/${courseId}`)}
          className="mt-1 cursor-pointer text-white/60 hover:text-white transition"
        />

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Course Lectures
          </h1>
          <p className="text-sm text-white/50 max-w-xl mt-1">
            Manage your course structure.  
            Each lecture includes its <span className="text-white/70">title</span> and
            <span className="text-white/70"> video content</span>.
          </p>
        </div>
      </div>

     
      <div className="
        rounded-xl
        border border-white/10
        bg-gradient-to-r from-[#121523] to-[#0e1019]
        px-6 py-4
        text-sm text-white/70
      ">
        ✏️ <span className="font-medium text-white/80">Edit Lecture</span> allows you to
        update the lecture title, replace or upload a new video, and manage its content
        without affecting other lectures.
      </div>

      {/* CREATE LECTURE */}
      <div className="
        rounded-2xl
        border border-white/10
        bg-[#11131a]
        p-6
      ">
        <h2 className="text-lg font-semibold mb-1">
          Add a new lecture
        </h2>
        <p className="text-sm text-white/50 mb-5">
          This lecture will be added to your course timeline and can be edited later.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="e.g. Understanding the basics"
            className="
              flex-1
              bg-black/40
              border border-white/10
              rounded-lg
              px-4 py-3
              text-sm
              placeholder:text-white/40
              focus:outline-none
              focus:border-white/30
            "
          />

          <button
            onClick={handleCreateLecture}
            disabled={loading}
            className="
              px-7 py-3
              rounded-lg
              bg-white
              text-black
              text-sm font-medium
              hover:opacity-90
              transition
              flex items-center justify-center
            "
          >
            {loading ? (
              <ClipLoader size={18} color="black" />
            ) : (
              "Add Lecture"
            )}
          </button>
        </div>
      </div>

      {/* LECTURE LIST */}
      <div className="space-y-4">
        <h3 className="text-sm uppercase tracking-widest text-white/40">
          Existing lectures
        </h3>

        {lectureData?.length === 0 && (
          <div className="
            rounded-xl
            border border-dashed border-white/20
            bg-white/[0.02]
            p-8
            text-center
            text-white/50
            text-sm
          ">
            No lectures added yet.  
            Start by adding your first lecture above.
          </div>
        )}

        {lectureData?.map((lecture, index) => (
          <div
            key={index}
            className="
              group
              flex items-center justify-between
              gap-4
              px-5 py-4
              rounded-xl
              border border-white/10
              bg-[#12141c]
              hover:bg-[#171a25]
              transition
            "
          >
            {/* LEFT */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="
                w-9 h-9
                rounded-lg
                bg-white/10
                flex items-center justify-center
                text-sm font-medium text-white/70
              ">
                {index + 1}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {lecture.lectureTitle}
                </p>
                <p className="text-xs text-white/40">
                  Title & video content
                </p>
              </div>
            </div>

            
            <button
              onClick={() =>
                navigate(`/editlecture/${courseId}/${lecture._id}`)
              }
              className="flex items-center gap-2 px-4 py-2 
              rounded-lg border border-white/10 text-xs 
              font-medium  text-white/70  hover:text-white 
               hover:border-white/30 
                hover:bg-white/10  transition
              "
              title="Edit lecture title and video"
            >
              <FaEdit size={13} />
              Edit
            </button>
          </div>
        ))}
      </div>

    </div>
  </div>
);

 










 
  

  
}

export default CreateLecture