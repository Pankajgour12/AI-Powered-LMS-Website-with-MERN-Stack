import React from "react";
import { motion } from "framer-motion";
import {
  FiCode,
  FiLayout,
  FiSmartphone,
  FiShield,
  FiCpu,
  FiBarChart2,
} from "react-icons/fi";

const skills = [
  { label: "Web Dev", icon: FiCode, x: "-20%", y: "10%" },
  { label: "UI / UX", icon: FiLayout, x: "25%", y: "-5%" },
  { label: "App Dev", icon: FiSmartphone, x: "55%", y: "18%" },
  { label: "Ethical Hacking", icon: FiShield, x: "10%", y: "55%" },
  { label: "AI / ML", icon: FiCpu, x: "45%", y: "65%" },
  { label: "Data Science", icon: FiBarChart2, x: "75%", y: "40%" },
];

const ExploreCourses = () => {
  return (
    <section className="relative w-full bg-[#0b0f19] text-white overflow-hidden">
     
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute -top-60 -left-60 w-[700px] h-[700px] bg-indigo-500/20 blur-[200px]" />
      <div className="absolute -bottom-60 -right-60 w-[700px] h-[700px] bg-emerald-400/20 blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT  */}
        <div className="space-y-10">
          <span className="text-xs uppercase tracking-[0.4em] text-white/40">
            Explore Skill Domains
          </span>

          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-semibold tracking-tight leading-[1.05]">
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

          <button
            className="
      inline-flex items-center justify-center
      px-10 py-3.5
      rounded-full
      bg-white
      text-black
      text-sm font-medium
      hover:scale-[1.06]
      hover:shadow-[0_14px_50px_rgba(255,255,255,0.28)]
      transition
    "
          >
            Explore all courses
          </button>
        </div>

        {/* RIGHT  */}
        <div className="relative h-[520px] hidden lg:block">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 7 + i * 0.6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="absolute"
                style={{ left: skill.x, top: skill.y }}
              >
                <div
                  className="
                    group
                    w-36 h-36
                    rounded-full
                    bg-white/10
                    backdrop-blur-xl
                    border border-white/20
                    flex flex-col items-center justify-center gap-2
                    hover:scale-110
                    transition
                  "
                >
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-lg">
                    <Icon />
                  </div>

                  <span className="text-xs text-white/80 tracking-wide">
                    {skill.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MOBILE  */}
        <div className="grid grid-cols-2 gap-4 lg:hidden mt-16">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <div
                key={i}
                className="rounded-2xl bg-white/10 border border-white/15 px-4 py-5 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center">
                  <Icon />
                </div>
                <span className="text-sm">{skill.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreCourses;
