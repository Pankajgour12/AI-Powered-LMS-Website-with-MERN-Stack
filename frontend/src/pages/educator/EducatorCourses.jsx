import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import emptyImg from "../../assets/empty.jpg";
import { useSelector } from "react-redux";

const Courses = () => {
  const navigate = useNavigate();
  const { creatorCourseData } = useSelector((state) => state.course);

  return (
    <div className="min-h-screen bg-[#05060b] text-white">
      <div className="max-w-6xl mx-auto px-5 py-8">

        {/* top */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FaArrowLeftLong
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer text-white/50 hover:text-white"
            />
            <h1 className="text-xl font-semibold tracking-tight">
              Courses
            </h1>
          </div>

          <button
            onClick={() => navigate("/create-courses")}
            className="
              px-4 py-2
              text-sm font-medium
              rounded-md
              bg-white text-black
              hover:opacity-90
              transition
            "
          >
            Create
          </button>
        </div>
        {/* desktop */}
        <div className="hidden md:block">
  <div className="border border-white/10 rounded-lg overflow-hidden">
    {creatorCourseData?.courses?.map((course, index) => (
      <div
        key={index}
        onClick={() => navigate(`/viewcourse/${course?._id}`)}
        className="
          group
          flex items-center gap-6
          px-4 py-3
          border-b border-white/10
          hover:bg-white/[0.04]
          transition
          cursor-pointer
        "
      >
        <img
          src={course?.thumbnail || emptyImg}
          alt=""
          className="w-32 h-16 rounded object-cover"
        />

        <div className="flex-1 min-w-0">
          <p className="text-lg text-white/80 group-hover:text-white font-medium truncate">
            {course?.title}
          </p>
        </div>

        <div className="text-sm text-white/60 w-20">
          {course?.price ? `₹${course.price}` : "Free"}
        </div>

        {/* STATUS */}
        <div className="w-24">
          <span
            className={`text-xs px-2 py-[2px] rounded-full border ${
              course.isPublished
                ? "border-emerald-400/30 text-emerald-400"
                : "border-rose-400/30 text-rose-400"
            }`}
          >
            {course.isPublished ? "Published" : "Draft"}
          </span>
        </div>

        {/* EDIT */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/editcourses/${course?._id}`);
          }}
          className="
            flex items-center gap-1
            px-2 py-2
            rounded-md
            text-white/50
            hover:text-white
            hover:bg-white/10
            transition
          "
        >
          <FaEdit size={13} />
          <span className="text-xs hidden lg:inline">
            Edit
          </span>
        </div>
      </div>
    ))}
  </div>
        </div>

          {/* mobile view */}
       <div className="md:hidden space-y-3">
  {creatorCourseData?.courses?.map((course, index) => (
    <div
      key={index}
      onClick={() => navigate(`/viewcourse/${course?._id}`)}
      className="
        flex items-center gap-3
        px-3 py-2
        rounded-md
        bg-white/[0.04]
        cursor-pointer
      "
    >
      <img
        src={course?.thumbnail || emptyImg}
        className="w-12 h-12 rounded object-cover"
        alt=""
      />

      {/* MAIN INFO */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {course?.title}
        </p>

        <div className="flex items-center gap-4 mt-0.5">
          <p className="text-xs text-white/50">
            {course?.price ? `₹${course.price}` : "Free"}
          </p>

          {/* STATUS BADGE */}
          <span
            className={`text-[10px] px-2 py-[1px] rounded-full border ${
              course.isPublished
                ? "border-emerald-400/30 text-emerald-400"
                : "border-rose-400/30 text-rose-400"
            }`}
          >
            {course.isPublished ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      {/* EDIT ACTION */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/editcourses/${course?._id}`);
        }}
        className="
          flex items-center justify-center
          w-8 h-8
          rounded-full
          bg-white/10
          text-white/60
          hover:text-white
          hover:bg-white/20
          transition
        "
      >
        <FaEdit size={14} />
      </div>
    </div>
  ))}
       </div>


      </div>
    </div>
  );
};

export default Courses;
