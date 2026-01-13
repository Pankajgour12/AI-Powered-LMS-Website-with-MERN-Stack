import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const WHATSAPP_NUMBER = "919399098205"; 

function Footer() {
  return (
    <footer className="relative bg-[#04050a] text-white overflow-hidden">

      {/* ambient background */}
      <div className="absolute -top-40 left-1/3 w-[700px] h-[700px] bg-indigo-500/10 blur-[260px]" />
      <div className="absolute -bottom-40 right-1/3 w-[700px] h-[700px] bg-emerald-500/10 blur-[260px]" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-16">

        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-28 max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-white/50 mb-4">
            Talk to the builder
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            Got a question?  
            <span className="text-emerald-400"> Don’t hesitate.</span>
          </h2>
          <p className="mt-4 text-white/60">
            No forms. No bots. No sales talk.  
            Just a real conversation on WhatsApp.
          </p>

          {/* WhatsApp  */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Pankaj,%20I%20found%20LeanFlow%20and%20wanted%20to%20connect.`}
            target="_blank"
            rel="noreferrer"
            className="
              mt-8 inline-flex items-center gap-4
              px-7 py-4
              rounded-2xl
              bg-[#25D366]/10
              border border-[#25D366]/40
              text-[#25D366]
              hover:bg-[#25D366]/20
              transition
            "
          >
            <div className="w-11 h-11 rounded-xl bg-[#25D366]/20 flex items-center justify-center text-xl">
              <FaWhatsapp />
            </div>
            <span className="text-sm font-medium">
              Message me on WhatsApp
            </span>
          </motion.a>
        </motion.div>

        {/* MAIN  */}
        <div className="grid gap-20 md:grid-cols-4">

          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={logo} alt="LearnFlow" className="w-12 h-12" />
              <span className="text-xl font-semibold tracking-wide">
                LearnFlow
              </span>
            </div>
            <p className="text-sm text-white/65 leading-relaxed max-w-sm">
              LearnFlow is built for people who want real skills,
              not surface-level tutorials.
            </p>
          </div>

          {/* CATEGORIES */}
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Categories
            </p>
            <ul className="space-y-3 text-sm text-white/55">
              <li>Web Development</li>
              <li>Full Stack MERN</li>
              <li>Data Science</li>
              <li>System Design</li>
              <li>Career Roadmaps</li>
            </ul>
          </div>

          {/* NAVIGATION */}
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Navigate
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "Courses", to: "/allcourses" },
                { label: "Profile", to: "/profile" },
                { label: "Dashoboard", to: "/dashboard" },
               
                
                
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="text-white/55 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIALS */}
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Find me online
            </p>

            <div  className="flex gap-4">
              <a className="social github" href="https://github.com/Pankajgour12" target="_blank" rel="noreferrer"><FaGithub /></a>
              <a className="social linkedin" href="https://linkedin.com/in/pankajgour404" target="_blank" rel="noreferrer"><FaLinkedin /></a>
              <a className="social twitter" href="https://x.com/Pankajgour404" target="_blank" rel="noreferrer"><FaXTwitter /></a>
              <a className="social instagram" href="https://www.instagram.com/pankaj_vimla_gour/" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a className="social whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><FaWhatsapp /></a>
            </div>
          </div>
        </div>

        {/*  BOTTOM */}
        <div className="mt-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="mt-6 flex justify-between items-center text-xs text-white/45">
          <span>© {new Date().getFullYear()} LearnFlow</span>
          <span>
            Built by <span className="text-emerald-400 font-medium">Pankaj Gour</span>
          </span>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
