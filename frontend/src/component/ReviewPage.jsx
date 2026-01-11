import React from "react";
import { useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";

function ReviewPage() {
  const { reviewData } = useSelector((state) => state.review);

 
  const courseStats = {};
  reviewData?.forEach((r) => {
    const key = r.course?.title;
    if (!key) return;
    if (!courseStats[key]) courseStats[key] = { total: 0, count: 0 };
    courseStats[key].total += r.rating;
    courseStats[key].count += 1;
  });

  return (
    <section className="relative bg-black overflow-hidden py-16">
      <div className="relative z-10 max-w-7xl mx-auto px-6">

      {/* HERO CONTENT */}
        <div className="max-w-3xl mb-20">
          <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">
            LeanFlow Reviews
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Built for learners who care about
            <span className="text-emerald-400"> real skills</span>, not hype.
          </h1>
          <p className="text-white/60 text-lg">
            Every review below comes from a learner who completed a LeanFlow course
            and applied it in real projects.  
            No marketing words. Just outcomes.
          </p>
        </div>
       </div> 

      {/*  MARQUEE */}
      <div className="relative overflow-hidden">

        <div className="pointer-events-none absolute inset-0 z-10
          bg-[linear-gradient(to_right,rgba(0,0,0,1),rgba(0,0,0,0)_15%,rgba(0,0,0,0)_85%,rgba(0,0,0,1))]" />

        <div className="flex gap-10 max-w-9xl trust-marquee">
          {[...reviewData, ...reviewData].map((review, index) => {
            const stats = courseStats[review.course?.title];
            const avg = stats ? stats.total / stats.count : review.rating;

            return (
              <ReviewCard
                key={index}
                comment={review.comment}
                rating={review.rating}
                avgRating={avg}
                totalReviews={stats?.count || 1}
                courseTitle={review.course?.title}
                photoUrl={review.user?.photoUrl}
                description={review.user?.description}
                name={review.user?.name}
              />
            );
          })}
        </div>
      </div>

     
      
    </section>
  );
}

export default ReviewPage;
