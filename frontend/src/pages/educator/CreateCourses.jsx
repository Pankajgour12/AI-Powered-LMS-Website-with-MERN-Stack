import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourseData, setCourseData } from '../../redux/courseSlice'
import { serverUrl } from "../../App";
import { toast } from "sonner";

import { ClipLoader } from "react-spinners";

const CreateCourses = () => {
  const navigate = useNavigate();

const [title, setTitle] = useState("");
const [category, setCategory] = useState("");
const [loading, setLoading] = useState(false);


  const dispatch = useDispatch()
  const {creatorCourseData, courseData} = useSelector(state=>state.course)

  const handleCreateCourse = async () => {
      if (loading) return;
    if (!title?.trim()) {
  toast.error("Course title is required");
  return;
}

if (!category) {
  toast.error("Please select a category");
  return;
}

    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/course/create",
        { title, category },
        { withCredentials: true }
      );
      const created = result.data.course
     
      const existing = creatorCourseData?.courses ?? []
      dispatch(setCreatorCourseData({ ...creatorCourseData, courses: [...existing, created] }))
      if(created?.isPublished){
        const pubExisting = courseData?.courses ?? []
        dispatch(setCourseData({ ...courseData, courses: [...pubExisting, created] }))
      }

      navigate("/edu-courses");
      setLoading(false);
      toast.success("Course Created");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(
  error.response?.data?.message || "Something went wrong"
);
     
    }
  };

  return (
    <div className="min-h-screen bg-[#07090d] flex items-center justify-center px-4 py-16 text-white">
      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-[0_50px_120px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* LEFT —  CONTEXT */}
        <div className="relative p-10 flex flex-col justify-between">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-500/20 blur-[160px]" />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-emerald-400/20 blur-[160px]" />

          <button
            onClick={() => navigate("/edu-courses")}
            className="relative z-10 text-white/60 hover:text-white transition w-fit"
          >
            <FaArrowLeftLong size={20} />
          </button>

          <div className="relative z-10 space-y-6 mt-10">
            <span className="text-xs uppercase tracking-[0.35em] text-white/40">
              LearnFlow
            </span>

            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Create a new
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                learning experience
              </span>
            </h1>

            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Start with a title and category. You’ll add lessons, pricing, and
              structure after publishing.
            </p>
          </div>

          <div className="relative z-10 text-xs text-white/30 mt-12">
            Draft • Editable anytime • Private by default
          </div>
        </div>

        {/*   FORM */}
        <div className="relative p-10 bg-black/40 backdrop-blur-xl">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/50">
                Course title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Course Title"
                className="w-full bg-transparent border-b border-white/20 px-1 py-3 text-lg placeholder:text-white/30 focus:outline-none  focus:border-white transition"
              />
            </div>

         {/* CATEGORY  */}
<div className="space-y-2">
  <label className="text-xs uppercase tracking-widest text-white/50">
    Category
  </label>

  <div className="relative group">
  
    <div
      className="
        h-14
        w-full
        rounded-2xl
        bg-gradient-to-br from-white/10 to-white/5
        backdrop-blur-xl
        border border-white/15
        px-5
        flex items-center justify-between
        text-sm
        text-black
        cursor-pointer
        group-hover:border-white/30
        transition
       
      "
    >
      <span className={category ? "text-white " : "text-white/40"}>
        {category || "Select a course category"}
      </span>

      <span className="text-white/40 group-hover:text-white transition">
        ⌄
      </span>
    </div>

    {/* REAL SELECT (invisible but functional) */}
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="
        absolute inset-0
        h-full
        w-full
        
        
        opacity-0
        cursor-pointer
        bg-gray-600
      "
    >
      <option value="">Select category</option>
      <option value="Web Development">Web Development</option>
      <option value="UI/UX">UI / UX Design</option>
      <option value="App Development">App Development</option>
      <option value="Ethical Hacking">Ethical Hacking</option>
      <option value="AI/ML">AI / ML</option>
      <option value="Data Science">Data Science</option>
      <option value="Other">Other</option>
    </select>
  </div>
</div>



           
            <div className="pt-6">
              <button
                disabled={loading}
                onClick={handleCreateCourse}
                className="
                w-full
                py-4
                rounded-full
                bg-white
                text-black
                font-medium
                hover:scale-[1.03]
                hover:shadow-[0_15px_50px_rgba(255,255,255,0.25)]
                disabled:opacity-60
                transition
                cursor-pointer
                flex items-center justify-center
              "
              >
                {loading ? (
                  <ClipLoader size={22} color="black" />
                ) : (
                  "Create draft course"
                )}
              </button>

              <p className="text-center text-xs text-white/40 mt-4">
                You can edit everything before publishing
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourses;
