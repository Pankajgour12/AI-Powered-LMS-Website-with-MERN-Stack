import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../../../App'
import { toast } from "sonner";
import { setLectureData } from '../../../redux/lectureSlice'
import { ClipLoader } from 'react-spinners'

const EditLecture = () => {
   const {courseId, lectureId} = useParams()

   const {lectureData} = useSelector(state=>state.lecture)


   const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)

   const navigate = useNavigate()

   const [lectureTitle, setLectureTitle] = useState(selectedLecture.lectureTitle)
   const [videoUrl, setVideoUrl] = useState("")
    const [isPreviewFree, setIsPreviewFree] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const dispatch = useDispatch()


    const formdata = new FormData()
    formdata.append("lectureTitle", lectureTitle)
    formdata.append("videoUrl", videoUrl)
    formdata.append("isPreviewFree", isPreviewFree)

    const handleEditLecture = async () =>{
        setLoading(true)    
        try {
            const result = await axios.post(serverUrl + `/api/course/editlecture/${lectureId}`, formdata ,{withCredentials:true})
            console.log(result.data);
            dispatch(setLectureData([...lectureData , result]))
            setLoading(false)
            toast.success("Lecture Updated ")
            navigate('/edu-courses')

        } catch (error) {
            console.log("Error while updating lecture:", error);
            setLoading(false)
            toast.error("Failed to update lecture",error.response.data.message)

            
        }







    }


    const removeLecture = async () =>{
    setLoading1(true)
    
    try {
        const result = await axios.delete(serverUrl + `/api/course/removelecture/${lectureId}`, {withCredentials:true})
        console.log(result.data);
        setLoading1(false)
        navigate(`/createlecture/${courseId}`)
        toast.success("Lecture Removed ")
    } catch (error) {
        console.log("Error while removing lecture:", error);
        setLoading1(false)
        toast.error("Failed to remove lecture",error.response.data.message)
        
    }

  }


return (
  <div className="min-h-screen bg-[#05060b] 
  flex items-center justify-center px-4">

    {/*  background */}
    <div className="absolute inset-0
     bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.12),
     transparent_40%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.1),transparent_45%)]" />

    <div className="relative w-full max-w-2xl rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8 space-y-8">

      {/* HEADER */}
      <div className="flex items-center gap-4">
        <FaArrowLeftLong
          className="text-white/70 hover:text-white cursor-pointer transition"
          onClick={() => navigate(`/createlecture/${courseId}`)}
        />
        <div>
          <h2 className="text-2xl font-bold text-white">
            Edit Lecture
          </h2>
          <p className="text-sm text-white/50">
            Update lecture content & access
          </p>
        </div>
      </div>

      
      <div className="flex items-center justify-between
       rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-red-400">
            Remove this lecture
          </p>
          <p className="text-xs text-red-400/70">
            This action is permanent
          </p>
        </div>

        <button
          disabled={loading1}
          onClick={removeLecture}
          className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium
           hover:bg-red-700 transition disabled:opacity-60"
        >
          {loading1 ? <ClipLoader size={18} color="white" /> : "Delete"}
        </button>
      </div>

      {/* FORM */}
      <div className="space-y-6">

        
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Lecture Title
          </label>
          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            className="w-full rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g. Introduction"
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Upload Lecture Video
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoUrl(e.target.files[0])}
            className="w-full text-sm text-white
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:bg-emerald-500 file:text-black
              hover:file:bg-emerald-400 transition"
          />
        </div>

        {/* PREVIEW */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="preview"
            className="h-4 w-4 accent-emerald-500"
            onChange={() => setIsPreviewFree(prev => !prev)}
          />
          <label htmlFor="preview" className="text-sm text-white/80">
            Allow free preview for students
          </label>
        </div>

        {loading && (
          <p className="text-xs text-emerald-400">
            Uploading video… please wait
          </p>
        )}
      </div>

     
      <button
        disabled={loading}
        onClick={handleEditLecture}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black py-3 text-sm font-semibold hover:opacity-90 transition disabled:opacity-60"
      >
        {loading ? <ClipLoader size={20} color="black" /> : "Save Changes"}
      </button>

    </div>
  </div>
);

 
}

export default EditLecture
