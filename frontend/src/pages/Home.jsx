import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../component/Navbar.jsx";
 import hero2 from "../assets/hero2.jpg";
// import home from "../assets/home.png";


import devIllustration from "../assets/BannerImage2.png";
import Logos from "../component/Logos.jsx";
import ExploreCourse from "../component/ExploreCourses.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {


  const navigate = useNavigate()
















  

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] overflow-hidden">

      <Navbar />
      <section className="relative min-h-screen bg-[#f6f7fb] overflow-hidden">

  {/* Navbar spacer */}
  <div className="h-20" />

  {/* Subtle canvas */}
  <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:32px_32px]" />

  {/* Atmosphere */}
  <div className="absolute -top-48 -left-48 w-[520px] h-[520px] bg-indigo-200/40 blur-[160px]" />
  <div className="absolute top-1/3 -right-48 w-[520px] h-[520px] bg-emerald-200/40 blur-[160px]" />

  <div className="relative z-10 max-w-[1440px] mx-auto px-6 py-24 grid lg:grid-cols-[1fr_1.2fr] gap-20 items-center">

    {/* LEFT — CONTENT */}
    <div className="space-y-10 ">
      <span className="text-xs tracking-[0.4em] uppercase text-gray-400">
        LearnFlow System
      </span>

      <h1 className="text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[1.05] text-gray-900">
        Learning that
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">
          adapts to you
        </span>
      </h1>

      <p className="max-w-lg text-gray-600 text-lg leading-relaxed">
        LearnFlow is a structured learning environment —  
        designed for clarity, progress and long-term mastery.
      </p>

      {/* Buttons — grounded */}
      <div className="flex flex-wrap gap-4 pt-4">
        <button className="
          px-7 py-3.5
          rounded-full
          bg-gray-900
          text-white
          text-sm sm:text-base
          font-medium
          hover:scale-[1.04]
          transition
        ">
          Enter LearnFlow
        </button>

        <button className="
          px-7 py-3.5
          rounded-full
          border border-gray-300
          text-gray-700 text-sm sm:text-base
          hover:border-gray-500 transition cursor-pointer
        "
        onClick={()=>navigate('/courses')}
        >
          View All Courses
        </button>
      </div>
    </div>

    {/* RIGHT — SYSTEM */}
    <div className="relative flex justify-center">

      {/* Orbit ring */}
      <div className="absolute w-[520px] h-[520px] rounded-full border border-gray-300/40" />

      {/* Image Core */}
      <div className="
        relative
        w-[340px] h-[340px]
        sm:w-[380px] sm:h-[380px]
        rounded-full
        bg-white
        shadow-[0_70px_160px_rgba(0,0,0,0.18)]
        flex items-center justify-center
      ">
        <img
          src={hero2}
          alt="Learner"
          className="w-[78%] object-contain"
        />
      </div>

      {/* === FLOATING SIGNALS (NO OVERLAP) === */}

      {/* Top */}
      <motion.div
        animate={{ y: [-6, 6] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="
          absolute
          top-0
          left-3
          bg-white
          px-5 py-3
          rounded-xl
          shadow-md
        "
      >
        <div className="text-[10px] uppercase tracking-widest text-gray-400">
          Courses
        </div>
        <div className="text-xl font-semibold text-gray-900">120+</div>
      </motion.div>

      {/* Right */}
      <motion.div
        animate={{ x: [6, -6] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="
          absolute
          right-[-2.5rem]
          top-1/2 -translate-y-1/2
          bg-white
          px-5 py-3
          rounded-xl
          shadow-md
        "
      >
        <div className="text-[10px] uppercase tracking-widest text-gray-400">
          Rating
        </div>
        <div className="text-xl font-semibold text-gray-900">4.9 ★</div>
      </motion.div>

      {/* Bottom */}
      <motion.div
        animate={{ y: [6, -6] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="
          absolute
          -bottom-6
          left-12
          bg-white
          px-5 py-3
          rounded-xl
          shadow-md
        "
      >
        <div className="text-[10px] uppercase tracking-widest text-gray-400">
          Learners
        </div>
        <div className="text-xl font-semibold text-gray-900">20k+</div>
      </motion.div>
    </div>
  </div>

  {/* MOBILE — CLEAN STACK */}
  <div className="lg:hidden px-6 pb-20 space-y-4">
    <div className="grid grid-cols-3 gap-3">
      {[
        ["Courses", "120+"],
        ["Rating", "4.9"],
        ["Learners", "20k+"],
      ].map(([t, v]) => (
        <div key={t} className="rounded-xl bg-white shadow p-3 text-center">
          <div className="text-[10px] text-gray-400 uppercase">{t}</div>
          <div className="text-base font-semibold">{v}</div>
        </div>
      ))}
    </div>
  </div>
</section>


    



  







     

      


     








      


   

     

           {/*  card */ }
    <section>
           <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            >
          <Logos/>

          </motion.div>
    </section>


            <ExploreCourse/>
    



      {/* ================= LMS SHOWCASE ================= */}
      <section className="py-24 bg-[#0b0f19] text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={devIllustration}
              alt="developer"
              className="w-full max-w-md mx-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl md:text-4xl font-semibold">
              Learning, redesigned
            </h2>

            <p className="text-gray-300">
              LearnFlow blends AI discovery with structured learning so you
              always know what to learn next — no confusion, no overwhelm.
            </p>

            <button className="self-start px-6 py-3 rounded-full bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition">
              Join LearnFlow
            </button>
          </motion.div>
        </div>
      </section>

    </div>

   

  );
};

export default Home;
