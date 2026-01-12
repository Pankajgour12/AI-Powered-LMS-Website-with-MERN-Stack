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

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FaArrowLeftLong
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer text-white/40 hover:text-white transition"
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

      {/* DESKTOP */}
      <div className="hidden md:block">
        <div className="rounded-lg border border-white/10 overflow-hidden divide-y divide-white/10">
          {creatorCourseData?.courses?.map((course, index) => (
            <div
              key={index}
              className="
                group
                relative
                flex items-center gap-6
                px-5 py-4
                hover:bg-white/[0.035]
                transition
                cursor-pointer
              "
            >
             
              <img
                src={course?.thumbnail || emptyImg}
                alt=""
                className="w-28 h-14 rounded-md object-cover flex-shrink-0"
              />

             
              <div className="flex-1 min-w-0"
              onClick={() => navigate(`/viewcourse/${course?._id}`)}
              
              >
                <p className="
                  text-[15px]
                  font-medium
                  text-white/85
                  group-hover:text-white
                  truncate
                ">
                  {course?.title}
                </p>
              </div>

              
              <div className="text-sm text-white/50 w-20 text-right">
                {course?.price ? `₹${course.price}` : "Free"}
              </div>

            
              <div className="w-24 text-right">
                <span
                  className={`
                    inline-flex items-center
                    text-[11px]
                    px-2 py-[3px]
                    rounded-full
                    border
                    ${
                      course.isPublished
                        ? "border-emerald-400/30 text-emerald-400"
                        : "border-rose-400/30 text-rose-400"
                    }
                  `}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/editcourses/${course?._id}`);
                }}
                className="
                  ml-2
                  flex items-center gap-2
                  px-3 py-2
                  rounded-md
                  text-xs font-medium
                  text-white/70
                  border border-white/10
                  hover:border-white/30
                  hover:text-white
                  hover:bg-white/10
                  transition
                "
              >
                <FaEdit size={12} />
                <span className="hidden lg:inline">
                  Edit
                </span>
              </div>

              
              <div className="
                absolute left-0 top-0 bottom-0
                w-[2px]
                bg-white/0
                group-hover:bg-white/20
                transition
              " />
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden space-y-3">
        {creatorCourseData?.courses?.map((course, index) => (
          <div
            key={index}
            onClick={() => navigate(`/viewcourse/${course?._id}`)}
            className="
              group
              relative
              flex items-center gap-3
              px-3 py-2.5
              rounded-md
              bg-white/[0.035]
              border border-white/10
              cursor-pointer
            "
          >
            <img
              src={course?.thumbnail || emptyImg}
              className="w-12 h-12 rounded object-cover"
              alt=""
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {course?.title}
              </p>

              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-white/50">
                  {course?.price ? `₹${course.price}` : "Free"}
                </span>

                <span
                  className={`
                    text-[10px]
                    px-2 py-[1px]
                    rounded-full
                    border
                    ${
                      course.isPublished
                        ? "border-emerald-400/30 text-emerald-400"
                        : "border-rose-400/30 text-rose-400"
                    }
                  `}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </span>
              </div>
            </div>

            {/* EDIT –  */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/editcourses/${course?._id}`);
              }}
              className="
                w-9 h-9
                rounded-full
                flex items-center justify-center
                bg-white/10
                text-white/70
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
