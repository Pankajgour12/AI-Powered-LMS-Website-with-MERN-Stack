import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { motion } from "framer-motion";

function MyEnrolledCourses() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { courseData } = useSelector(state => state.course);

const isEducator = userData?.role === "educator" && !!courseData?.courses;



const coursesToShow = isEducator
  ? courseData?.courses?.filter(
      course =>
        course.creator?.toString() === userData._id?.toString()
    )
  : userData?.enrolledCourses;


  
 



  
if (isEducator && !courseData?.courses) {
  return (
    <div className="min-h-screen flex items-center justify-center text-white/60">
      Loading courses...
    </div>
  );
}


  return (
    <div className="min-h-screen bg-[#05060b] text-white relative overflow-hidden">
      
 <div className="pointer-events-none absolute inset-0">
    <div className="absolute -top-56 -left-56 w-[700px] h-[700px] bg-indigo-50020 blur-[260px]" />
    <div className="absolute top-1/3 right-[-300px] w-[600px] h-[600px] bg-sky-500/20 blur-[260px]" />
    <div className="absolute bottom-[-300px] left-1/4 w-[600px] h-[600px] bg-emerald-500/20 blur-[260px]" />
  </div>


      {/* back */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-sm  text-white/60 hover:text-white transition"
      >
        <FaArrowLeftLong size={16} />
        Home
      </button>

      {/* HEADER */}
      <header className="relative max-w-4xl mx-auto px-6 pt-24 pb-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.55em] text-white/40">
    LearnFlow
  </p>

  <h1 className="mt-8 font-semibold leading-[1.05]">
    <span className="block text-[clamp(2.8rem,6vw,4.2rem)]">
  {isEducator ? "Your Teaching" : "Your Learning"}
</span>

    <span className="block text-[clamp(2.8rem,6vw,4.2rem)] bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">
      Timeline
    </span>
  </h1>

        <p className="mt-8 max-w-2xl mx-auto text-white/65 leading-relaxed">
          These aren’t just courses.  
          Each one represents focus, effort, and time invested in yourself.
        </p>
      </header>

      {/* CONTENT */}
      <main className="relative max-w-5xl mx-auto px-6 pb-32">
        {!coursesToShow || coursesToShow.length === 0 ? (
          <div className="text-center text-white/60 py-24">
  {isEducator
    ? "You haven’t created any courses yet."
    : "You haven’t enrolled in any courses yet."}
</div>


          
        ) : (
          <div className="relative">
            {/* vertical spine */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden sm:block" />

            <div className="space-y-28">
              
                {coursesToShow.map((course, index) => {

                const left = index % 2 === 0;

                return (
                  <motion.section
  key={course._id}
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-160px" }}
  transition={{ duration: 0.9, ease: "easeOut" }}
  className={`flex flex-col sm:flex-row ${
    left ? "sm:flex-row-reverse" : ""
  } items-center gap-12`}
>

                    {/* TEXT */}
                    <div className="sm:w-1/2 px-4">
                      <motion.div
                        whileHover={{ y: -6 }}
                        className="space-y-4"
                      >
                        <h2 className="text-xl font-semibold">
                          {course.title}
                        </h2>

                        <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-white/45">
                          <span>{course.category}</span>
                          <span className="w-1 h-1 rounded-full  bg-green-400" />
                          <span>{course.level}</span>
                        </div>

                        <p className="text-sm text-white/65 leading-relaxed max-w-md">
                          Progress isn’t about speed.  
                          It’s about showing up — again and again.
                        </p>

                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() =>
                            navigate(`/viewlecture/${course._id}`)
                          }
                          className="
                            mt-2 inline-flex items-center
                            px-7 py-2.5 rounded-full
                            text-sm font-medium text-black
                            bg-gradient-to-r
                            from-indigo-300 via-sky-200 to-emerald-300
                            shadow-[0_10px_40px_rgba(99,102,241,0.35)]
                          "
                        >
                          {isEducator ? "View Course →" : "Continue Learning →"}

                        </motion.button>
                      </motion.div>
                    </div>

                    {/* IMAGE */}
                    <div className="sm:w-1/2 flex justify-center mt-12 sm:mt-0 px-4">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 120 }}
                        className="relative w-full max-w-md"
                      >
                        <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                        </div>
                      </motion.div>
                    </div>
                  </motion.section>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MyEnrolledCourses;
