import React from "react";
import { motion } from "framer-motion";
import Navbar from "../component/Navbar.jsx";
 import hero2 from "../assets/hero.png";
// import home from "../assets/home.png";
import ai from "../assets/ai.png";

// import devIllustration from "../assets/BannerImage2.png";
import Logos from "../component/Logos.jsx";
import ExploreCourse from "../component/ExploreCourses.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import CardPage from "../component/CardPage.jsx";
import AboutSection from "../component/About.jsx";
import Footer from "../component/Footer.jsx";
import ReviewPage from "../component/ReviewPage.jsx";
import { useEffect } from "react";



const Home = () => {


  const navigate = useNavigate()
  const location = useLocation();


 useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);















  

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] overflow-hidden">

      <Navbar />
      
     <section className="relative min-h-screen bg-[#05070c] text-white overflow-hidden">

  
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] [background-size:42px_42px]" />
  <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:120px_120px] opacity-40" />

 
  <div className="absolute -top-1/3 -left-1/4 w-[800px] h-[800px] bg-indigo-500/30 blur-[220px]" />
  <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-emerald-300/40 blur-[220px]" />

  <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-40 grid lg:grid-cols-[1fr_1.3fr] gap-24 items-center ">

    {/* LEFT  */}
       <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >

    <div className="space-y-12"
   
    >

       <span className="text-xs tracking-[0.4em] uppercase text-white/50">
        LearnFlow Platform
      </span>

      <h1 className="text-[clamp(2.8rem,5vw,4.2rem)] font-semibold leading-[1.05]">
        Learn skills that
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
          actually matter
        </span>
      </h1>

      <p className="max-w-xl text-lg text-white/70 leading-relaxed">
        Structured courses, real projects, and industry-ready learning 
        designed for people who want results, not certificates.
      </p>


      

      {/*  BUTTONS */}
      <div className="flex flex-wrap gap-6 pt-6">

        {/* AI SEARCH */}
        <button className="
          group relative
          px-8 py-4
          rounded-full
          bg-white/10
          backdrop-blur
          border border-white/20
          text-white
          font-medium
          overflow-hidden
          hover:scale-[1.06]
          transition
        "
        onClick={()=>navigate('/search')}

        >
          <span className="relative z-10 flex items-center gap-2">
                            <img src={ai} className='w-5 h-5 sm:w-7 sm:h-7 ' alt="" />
             Search with AI
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 opacity-0 group-hover:opacity-30 transition" />
        </button>

        {/* VIEW COURSES */}
        <button
          onClick={() => navigate("/allcourses")}
          className="
            relative
            px-8 py-4
            rounded-full
            border border-white/30
            text-white/80
            font-medium
            hover:text-white
            hover:border-white
            transition
          "
        >
          View all Courses →
        </button>
      </div>
    </div>
    </motion.div>

    {/* RIGHT  */}

    <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
    <div className="relative flex justify-center items-center">

     
      <div className="absolute w-[520px] h-[520px] rounded-full border border-white/15 animate-[spin_60s_linear_infinite]" />
      <div className="absolute w-[420px] h-[420px] rounded-full border border-gray-400 animate-[spin_40s_linear_reverse_infinite]" />

      
      <div className="
        relative
        w-[340px] h-[340px]
        sm:w-[380px] sm:h-[380px]
        rounded-[38%_62%_55%_45%]
        bg-gradient-to-br from-white/20 to-white/5
        backdrop-blur-xl
        shadow-[0_100px_240px_rgba(0,0,0,0.9)]
        flex items-center justify-center
      ">
        <img
          src={hero2}
          alt="Learning Core"
          className="w-[85%] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
        />
      </div>


 <motion.div
  animate={{ y: [-6, 6] }}
  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  className="
  absolute
  top-[-1.8rem]
  left-1/4 -translate-x-1/3
  
    z-0
  "
>
  <div
    className="
      px-4 py-2
      rounded-xl
      bg-white/10
      backdrop-blur-lg
      border border-white/20
      shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      text-center
      lg:block
      sm:hidden
    
      
    "
  >
    <div className="text-lg sm:text-2xl font-semibold text-white">
      120+
    </div>
    <div className="text-[9px] tracking-[0.35em] text-white/50">
      COURSES
    </div>
  </div>
</motion.div>


  <motion.div
  animate={{ x: [6, -6] }}
  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
  className="
    absolute
    right-[-1.01rem]
    sm:right-[-3.2rem]
    top-1/2 -translate-y-1/2
    z-0
  "
>
  <div
    className="
      px-4 py-2
      rounded-xl
      bg-white/10
      backdrop-blur-lg
      border border-white/20
      shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      text-center
    "
  >
    <div className="text-lg sm:text-2xl font-semibold text-amber-400">
      4.9 ★
    </div>
    <div className="text-[9px] tracking-[0.35em] text-white/50">
      RATING
    </div>
  </div>
</motion.div>


 <motion.div
  animate={{ y: [6, -6] }}
  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  className="
    absolute
    bottom-[-2.2rem]
    left-[18%]
    sm:bottom-[-3.6rem]
    z-0
  "
>
  <div
    className="
      px-4 py-2
      rounded-xl
      bg-white/10
      backdrop-blur-lg
      border border-white/20
      shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      text-center
    "
  >
    <div className="text-lg sm:text-2xl font-semibold text-white">
      20K+
    </div>
    <div className="text-[9px] tracking-[0.35em] text-white/50">
      LEARNERS
    </div>
  </div>
</motion.div>


     






    
  </div>

  </motion.div>
 
 
  

  




  





  {/* MOBILE — METRIC STRIP */}
<div className="lg:hidden mt-12 px-6  ">
  <div className="flex justify-between text-center">
    {[
      ["120+", "Courses"],
      ["4.9", "Rating"],
      ["20k+", "Learners"],
    ].map(([v, l]) => (
      <div key={l}>
        <div className="text-xl font-semibold">{v}</div>
        <div className="text-[9px] uppercase tracking-[0.35em] text-white/50 mt-1">
          {l}
        </div>
      </div>
    ))}
  </div>
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


            <section id="explore" >
           <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            >

          <ExploreCourse/>

          </motion.div>
    </section>

           



            <CardPage/>

            
<section id="about">
  <AboutSection />
</section>


              <ReviewPage/>
          

    



  

      {/* Footer  */}
      <Footer/>
      

      

    </div>

   

  );
};

export default Home;
