import React from "react";
import banner from "../assets/AboutBannerImage.png";
import boy from "../assets/BannerImage.jpg";
import BannerVideo from "../assets/BannerVideo.mp4";

function AboutUs() {
  return (
    <div className="min-h-screen bg-[#05060b] text-white overflow-hidden"
    
    >

      {/* HERO (COMPACT) */}
      <section className="relative h-[65vh] flex items-center justify-center">

        <img
          src={banner}
          alt="Learning together"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-[#05060b]" />

        <div className="relative z-10 max-w-3xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            About LearnFlow
          </p>

          <h1 className="mt-5 text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-tight">
            Learning,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">
              Done With Intention
            </span>
          </h1>

          <p className="mt-5 text-white/65 leading-relaxed">
            LearnFlow is built for students who want clarity, not noise.
            Progress, not pressure.
          </p>
        </div>
      </section>

      {/* CORE BELIEF STRIP */}
      <section className="relative max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* text */}
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold">
            Why LearnFlow Feels Different
          </h2>

          <p className="text-white/65 leading-relaxed">
            Most platforms push content.
            We focus on how students actually learn.
          </p>

          <p className="text-white/65 leading-relaxed">
            LearnFlow respects your pace.
            It’s okay to pause, revisit, and grow slowly.
            That’s how real understanding forms.
          </p>
        </div>

        {/* image */}
        <div className="relative">
          <img
            src={boy}
            alt="Creative learning"
            className="rounded-2xl w-full object-cover"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/35 to-transparent" />
        </div>
      </section>

      {/* VIDEO PUNCH */}
      <section className="relative max-w-5xl mx-auto px-6 py-20">

        <div className="rounded-2xl overflow-hidden border border-white/10">
          <video
            src={BannerVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <p className="mt-6 text-center text-white/60 max-w-xl mx-auto">
          Learning isn’t about finishing fast.
          It’s about staying curious long enough for things to click.
        </p>
      </section>

      {/* MIC DROP */}
      <section className="relative text-center py-20">
        <h2 className="text-2xl font-semibold">
          This is LearnFlow.
        </h2>

        <p className="mt-4 text-white/60 max-w-lg mx-auto">
          Built for students who care about depth,
          not just certificates.
        </p>
      </section>

    </div>
  );
}

export default AboutUs;
