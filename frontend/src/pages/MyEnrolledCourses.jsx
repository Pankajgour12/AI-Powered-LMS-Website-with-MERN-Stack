import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

function MyEnrolledCourses() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#05060b] text-white relative overflow-hidden">

      {/* ambient gradients */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-indigo-500/15 blur-[220px]" />
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-emerald-500/15 blur-[220px]" />

      {/* back */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
      >
        <FaArrowLeftLong size={16} />
        <span>Home</span>
      </button>

     {/* header */}
<header className="relative max-w-4xl mx-auto px-6 pt-20 pb-20 text-center overflow-hidden">

 
  <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-indigo-500/20 blur-[180px]" />
  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[260px] h-[260px] bg-emerald-500/20 blur-[160px]" />

  
  <div className="relative z-10">

    <p className="text-xs uppercase tracking-[0.45em] text-white/50">
      LearnFlow • Student Space
    </p>

    <h1 className="
      mt-6
      text-[clamp(2.6rem,5vw,3.8rem)]
      font-semibold
      leading-tight
    ">
      <span className="block text-white">
        Your Learning
      </span>
      <span className="
        block
        text-transparent
        bg-clip-text
        bg-gradient-to-r
        from-indigo-400
        via-sky-400
        to-emerald-400
      ">
        Timeline
      </span>
    </h1>

   
    <div className="
      mx-auto
      mt-6
      h-[2px]
      w-24
      rounded-full
      bg-gradient-to-r
      from-indigo-500
      via-sky-400
      to-emerald-500
      opacity-80
    " />

    <p className="
      mt-6
      max-w-2xl
      mx-auto
      text-white/65
      leading-relaxed
      text-base
    ">
      Every course here represents time you’ve chosen to invest in yourself.
      This timeline isn’t about speed — it’s about consistency, clarity,
      and long-term growth.
    </p>

  </div>
</header>


      {/* Main section  */}
      <main className="relative max-w-5xl mx-auto px-6 pb-28">

        {userData.enrolledCourses.length === 0 ? (
          <div className="text-center text-white/60 py-24">
            You haven’t enrolled in any courses yet.
          </div>
        ) : (
          <div className="relative">

            {/*  (desktop) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden sm:block" />

            <div className="space-y-24">
              {userData.enrolledCourses.map((course, index) => {
                const alignLeft = index % 2 === 0;

                return (
                  <section
                    key={course._id}
                    className={`flex flex-col sm:flex-row ${
                      alignLeft ? "sm:flex-row-reverse" : ""
                    } items-center`}
                  >
                   
                    {/* text */}
<div className="sm:w-1/2 px-4">
  <div className="space-y-3">

    <h2 className="text-xl font-semibold leading-tight text-white">
      {course.title}
    </h2>

    <div className="flex items-center gap-3 text-xs text-white/40 uppercase tracking-wider">
      <span>{course.category}</span>
      <span className="w-1 h-1 rounded-full bg-white/30" />
      <span>{course.level}</span>
    </div>

    <p className="text-sm text-white/65 leading-relaxed max-w-md">
      You enrolled in this course to build real understanding.
      Progress may feel slow at times — that’s normal.
      What matters is showing up and continuing.
    </p>

    <button
      onClick={() => navigate(`/viewlecture/${course._id}`)}
      className="
        mt-2
        inline-flex
        items-center
        px-6 py-2.5
        rounded-full
        text-sm font-medium
        text-black
        cursor-pointer
        bg-gradient-to-r
        from-indigo-300
        via-sky-200
        to-emerald-300
        hover:opacity-90
        transition
      "
    >
      Continue
    </button>

  </div>
</div>

                    

                    {/* img */}
                    <div className="sm:w-1/2 flex justify-center mt-10 sm:mt-0 px-4">
                      <div className="relative w-full max-w-md">

                        <div className="
                          relative
                          aspect-video
                          rounded-2xl
                          overflow-hidden
                          border border-white/10
                          bg-black
                        ">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />

                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                        </div>

                      </div>
                    </div>
                  </section>
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
