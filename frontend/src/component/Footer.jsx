import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaEnvelope,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Footer() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  return (
    <footer
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      className="relative bg-[#05060b] text-white overflow-hidden"
    >
      {/* deep ambient gradients */}
      <div className="absolute -top-40 left-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[220px]" />
      <div className="absolute -bottom-40 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[220px]" />

      {/* cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px at ${pos.x}% ${pos.y}%, rgba(99,102,241,0.18), transparent 65%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-14">

        {/* TOP GRID */}
        <div className="grid gap-20 md:grid-cols-3">

          {/* BRAND */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="LearnFlow" className="w-11 h-11" />
              <span className="text-xl font-semibold tracking-wide">
                LearnFlow
              </span>
            </div>

            <p className="text-sm text-white/65 leading-relaxed max-w-sm">
              LearnFlow is a focused learning environment for people who value
              clarity, depth, and long-term skill growth — not shortcuts.
            </p>
          </div>

          {/* CONNECT */}
          <div className="space-y-8">
            <h4 className="text-xs uppercase tracking-[0.35em] text-white/60">
              Connect
            </h4>

            {/* email */}
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="mailto:Pankajgour5000@gmail.com"
              className="
                flex items-center gap-4
                px-6 py-4
                rounded-2xl
                bg-white/5
                border border-white/15
                backdrop-blur
                hover:border-white/30
                transition
              "
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <FaEnvelope />
              </div>

              <div>
                <p className="text-xs text-white/45">Write to</p>
                <p className="text-sm font-medium">
                  Pankajgour5000@gmail.com
                </p>
              </div>
            </motion.a>

            {/* socials */}
            <div className="flex gap-4">
              {[
                { icon: <FaGithub />, link: "https://github.com/Pankajgour12" },
                { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/pankaj-gour" },
                { icon: <FaXTwitter />, link: "https://twitter.com/" },
                { icon: <FaInstagram />, link: "https://instagram.com/" },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.9 }}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    w-12 h-12
                    flex items-center justify-center
                    rounded-2xl
                    bg-white/5
                    border border-white/10
                    text-lg text-white/60
                    hover:text-white
                    hover:border-white/30
                    transition
                  "
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.35em] text-white/60">
              Explore
            </h4>

            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "Courses", to: "/allcourses" },
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="
                      text-white/55
                      hover:text-white
                      transition
                      inline-block
                    "
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* BOTTOM */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/45">
          <span>© {new Date().getFullYear()} LearnFlow</span>
          <span>
            Crafted by{" "}
            <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">
              Pankaj Gour
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
