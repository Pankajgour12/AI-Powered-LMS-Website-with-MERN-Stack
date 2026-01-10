import React from "react";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";

function ReviewPage() {
  const { reviewData } = useSelector((state) => state.review);

  return (
    <section className="relative min-h-screen bg-black py-24">

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Learners Say About LeanFlow
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Thousands of learners trust LeanFlow to upgrade their skills, crack interviews,
            and build real-world projects. These reviews are unfiltered and real.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            ["10k+", "Active Learners"],
            ["4.9/5", "Average Rating"],
            ["50+", "Industry Projects"],
            ["100%", "Practical Learning"],
          ].map(([value, label], i) => (
            <div
              key={i}
              className="text-center bg-white/5 border border-white/10 rounded-xl py-6"
            >
              <h2 className="text-2xl font-bold text-emerald-400">{value}</h2>
              <p className="text-white/60 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviewData?.map((review, index) => (
            <ReviewCard
              key={index}
              courseTitle={review.course?.title}
              rating={review.rating}
              comment={review.comment}
              photoUrl={review.user?.photoUrl}
              description={review.user?.description}
              name={review.user?.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewPage;
