import React from "react";
import banner from "../assets/AboutBannerImage.png";
import BannerVideo from "../assets/BannerVideo.mp4";

function AboutUs() {
  return (
    <div className="bg-[#05060b] text-white overflow-hidden">

     
      <section className="relative h-[55vh] flex items-center justify-center">
        <img
          src={banner}
          alt="LearnFlow"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-[#05060b]" />

        <div className="relative z-10 max-w-2xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            About LearnFlow
          </p>

          <h1 className="mt-4 text-[clamp(2.2rem,4.5vw,3.2rem)] font-semibold leading-tight">
            We build skills  
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
              that don’t fade.
            </span>
          </h1>

          <p className="mt-4 text-white/65 text-sm leading-relaxed">
            No noise. No shortcuts.  
            Just learning that actually sticks.
          </p>
        </div>
      </section>

     
      <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* TEXT */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Why LearnFlow exists
          </h2>

          <p className="text-white/65 text-sm leading-relaxed">
            The internet made learning fast.
            It also made it shallow.
          </p>

          <p className="text-white/65 text-sm leading-relaxed">
            LearnFlow slows things down —
            so you actually understand what you’re building.
          </p>
        </div>

        
        <div className="relative">
          <div className="rounded-xl overflow-hidden border border-white/10 max-w-sm ml-auto">
            <video
              src={BannerVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          <p className="mt-3 text-xs text-white/50 text-right">
            Learning isn’t speed. It’s clarity.
          </p>
        </div>
      </section>

     
      <section className="text-center py-16">
        <p className="text-white/70 text-sm">
          Built for learners who care about depth.
        </p>

        <p className="mt-2 text-emerald-400 font-medium text-sm">
          That’s LearnFlow.
        </p>
      </section>

    </div>
  );
}

export default AboutUs;
