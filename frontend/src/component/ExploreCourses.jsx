import React from "react";
import { motion } from "framer-motion";
import {FiCode, FiLayout, FiSmartphone, FiShield,FiCpu, FiBarChart2,} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const skills = [
  { label: "Web Development", icon: FiCode, x: "-20%", y: "10%", drift: 12 },
  { label: "UI / UX", icon: FiLayout, x: "25%", y: "-5%", drift: 8 },
  { label: "App Development", icon: FiSmartphone, x: "55%", y: "18%", drift: 14 },
  { label: "Ethical Hacking", icon: FiShield, x: "10%", y: "55%", drift: 10 },
  { label: "AI / ML", icon: FiCpu, x: "45%", y: "65%", drift: 16 },
  { label: "Data Science", icon: FiBarChart2, x: "75%", y: "40%", drift: 9 },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.7 },
  show: { opacity: 1, scale: 1 },
};

const ExploreCourses = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-[#0b0f19] text-white overflow-hidden">
     
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute -top-60 -left-60 w-[700px] h-[700px] bg-indigo-500/20 blur-[200px]" />
      <div className="absolute -bottom-60 -right-60 w-[700px] h-[700px] bg-emerald-400/20 blur-[200px]" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20 items-center"
      >
        {/* LEFT */}
        <motion.div variants={item} className="space-y-10">
          <span className="text-xs uppercase tracking-[0.4em] text-white/40">
            Explore Skill Domains
          </span>

          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-semibold leading-[1.05]">
            Don’t learn everything.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
              Learn what actually compounds.
            </span>
          </h2>

          <p className="text-white/65 text-lg max-w-xl leading-relaxed">
            LearnFlow organizes modern careers into clear, outcome-driven
            domains. Each path is designed to build real, usable skill — not
            surface-level knowledge or endless tutorials.
          </p>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="
              inline-flex items-center justify-center
              px-10 py-3.5
              rounded-full
              bg-white
              text-black
              text-sm font-medium
              shadow-[0_20px_60px_rgba(255,255,255,0.25)]
            "
            onClick={() => navigate("/allcourses")}
          >
            Explore all courses
          </motion.button>
        </motion.div>

        {/* RIGHT  */}
        <div className="relative h-[520px] hidden lg:block">
          {skills.map((skill, i) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -skill.drift, 0],
                  x: [0, skill.drift / 2, 0],
                }}
                transition={{
                  duration: 9 + i,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="absolute"
                style={{ left: skill.x, top: skill.y }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.12,
                    rotate: 1.5,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="
                    group w-36 h-36
                    rounded-full
                    bg-white/10
                    backdrop-blur-xl
                    border border-white/20
                    flex flex-col items-center justify-center gap-2
                  "
                >
                  <div className="w-10 h-10 rounded-full bg-white text-blue-600 
                  flex items-center justify-center text-lg">
                    <Icon />
                  </div>

                  <span className="text-xs text-white/80 tracking-wide">
                    {skill.label}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* MOBILE */}
        <div className="grid grid-cols-2 
        gap-4 lg:hidden mt-16">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-white/10 border border-white/15 px-4 py-5 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center">
                  <Icon />
                </div>
                <span className="text-sm">{skill.label}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default ExploreCourses;
