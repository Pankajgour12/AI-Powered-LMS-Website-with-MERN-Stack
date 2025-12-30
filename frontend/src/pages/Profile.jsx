import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const Profile = () => {
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white relative overflow-hidden">

      {/* background grid */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-[#0b0f19]/80 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-white/60 hover:text-white transition"
          >
            <FaArrowLeftLong size={18} />
          </button>
          <span className="text-xs uppercase tracking-widest text-white/40">
            Profile
          </span>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-12">

        {/* LEFT */}
        <section className="space-y-8">

          {/* Identity Card */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 blur-3xl rounded-full" />

            <div className="relative flex items-center gap-5">
              {userData?.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  alt="profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-white/30 shrink-0"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-black flex items-center justify-center text-3xl font-semibold shrink-0">
                  {userData?.name?.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight truncate">
                  {userData?.name}
                </h1>

                <div className="mt-2 flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-white/10 border border-white/20 text-white/80">
                    {userData?.role}
                  </span>

                  <span className="text-xs text-white/40">
                    LearnFlow Member
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-3">
              About
            </span>

            <div className="text-sm sm:text-base text-white/75 leading-relaxed max-w-xl">
              {userData?.description?.trim()
                ? userData.description
                : "This profile is part of LearnFlow — a focused learning system designed for deep skill growth and long-term mastery."}
            </div>
          </div>

          {/* Action */}
          <div>
            <button
              onClick={() => navigate("/editprofile")}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/20 hover:border-white/40 transition text-sm"
            >
              Edit Profile
            </button>
          </div>
        </section>

        {/* RIGHT */}
        <aside className="space-y-8">

          {/* Account Overview */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-5">
              Account Overview
            </span>

            <div className="space-y-5">
              <div>
                <span className="block text-xs text-white/40">Email</span>
                <div className="mt-1 text-sm sm:text-base break-all">
                  {userData?.email}
                </div>
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs text-white/40">Role</span>
                  <div className="mt-1 text-sm capitalize">
                    {userData?.role}
                  </div>
                </div>

                <span className="px-3 py-1.5 rounded-full text-[10px] bg-white/10 border border-white/20 text-white/70">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-5">
              Learning Stats
            </span>

            <div className="flex items-end justify-between">
              <div>
                <span className="block text-xs text-white/40">
                  Enrolled Courses
                </span>
                <div className="mt-2 text-3xl font-semibold">
                  {userData?.enrolledCourses?.length || 0}
                </div>
              </div>

              <div className="text-xs text-white/40 max-w-[140px] text-right">
                Progress tracking will appear here
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-xs text-white/40 leading-relaxed max-w-sm">
            You’re part of the LearnFlow ecosystem — designed for builders who
            care about depth, not shortcuts.
          </div>

        </aside>
      </main>
    </div>
  );
};

export default Profile;
