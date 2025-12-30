import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../component/Navbar.jsx";
import { GrCatalog } from "react-icons/gr";
import heroKid from "../assets/Bannerimage.jpg";
import devIllustration from "../assets/BannerImage2.png";
import Logos from "../component/Logos.jsx";

const Home = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] overflow-hidden">
      <Navbar />
      


      {/* ===== HERO ===== */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-white to-sky-200" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-rose-300/30 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-sky-300/30 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Learn faster. <br />
              <span className="text-rose-600">Grow smarter.</span>
            </h1>

            <p className="text-gray-600 text-lg max-w-xl">
              LearnFlow uses AI-powered discovery to help you find the right
              courses, paths and skills — without noise.
            </p>

            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition">
                Start Learning
              </button>
              <button className="flex  items-center gap-2 px-6 py-3 rounded-full border border-rose-300 text-gray-700 hover:bg-sky-200 transition">
                <GrCatalog className=""/>
                View All Courses
              </button>
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <img
              src={heroKid}
              alt="learning"
              className="w-[420px] rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* == SEARCH SECTION == */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold text-gray-900"
          >
            Ask LearnFlow AI
          </motion.h2>

          <p className="text-gray-600 mt-3">
            Describe what you want to learn — we’ll find the best path for you.
          </p>

          {/* AI SEARCH BAR */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-10 relative"
          >
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-lg focus-within:ring-2 focus-within:ring-rose-400">
              <span className="text-gray-400 text-xl">⌘</span>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Find a full-stack roadmap for beginners"
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
              />

              <button
                className="
                  px-5 py-2 rounded-full
                  bg-gradient-to-r from-rose-500 to-pink-600
                  text-white text-sm font-medium
                  hover:opacity-90 transition
                "
              >
                Ask AI
              </button>
            </div>

            {/* SUGGESTIONS */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {[
                "React for beginners",
                "Backend roadmap",
                "AI & ML basics",
                "Best courses for placements",
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(item)}
                  className="
                    px-4 py-2 text-sm rounded-full
                    bg-gray-100 text-gray-700
                    hover:bg-gray-200 transition
                  "
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
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
