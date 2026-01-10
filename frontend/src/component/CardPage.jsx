import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

function CardPage() {
  const { courseData } = useSelector((state) => state.course);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    if (courseData?.courses) {
      setPopularCourses(courseData.courses.slice(0, 6));
    } else {
      setPopularCourses([]);
    }
  }, [courseData]);

  return (
    <section className="relative py-36 bg-[#06070c] text-white overflow-hidden">
      {/*  BACKGROUND  */}
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgNCA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmZmZmYwOCI+PC9yZWN0Pjwvc3ZnPg==')] opacity-30" />

      
      <div className="absolute -top-60 -left-60 w-[700px] h-[700px] bg-emerald-500/15  blur-[220px]" />
      <div className="absolute top-1/2 -right-60 w-[700px] h-[700px] bg-indigo-600/15 blur-[220px]" />

     
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ===== HEADER ===== */}
        <div className="max-w-3xl mx-auto text-center mb-28">
          <span className="text-[11px] uppercase tracking-[0.6em] text-white/40">
            LearnFlow • Skill Systems
          </span>

          <h1 className="mt-10 text-[clamp(2.8rem,5vw,4.6rem)] font-semibold leading-[1.05]">
            Learn like a
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">
              modern professional
            </span>
          </h1>

          <p className="mt-4 text-lg text-white/60 leading-relaxed">
            Curated learning systems designed for real-world execution.
            No fluff. No noise. Just skills that compound.
          </p>
        </div>

        
        <div
          className="
            relative
            grid gap-16
            sm:grid-cols-2
            lg:grid-cols-3
            place-items-center
          "
        >
          {popularCourses.map((course, index) => (
            <Card
              key={index}
              thumbnail={course.thumbnail}
              title={course.title}
              category={course.category}
              price={course.price}
              id={course._id}
              reviews={course.reviews}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardPage;
