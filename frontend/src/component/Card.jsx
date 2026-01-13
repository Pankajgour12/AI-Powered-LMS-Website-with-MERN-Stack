import React from "react";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Card = ({ thumbnail, title, category, price, id , reviews}) => {

  const navigate = useNavigate()

const calculateAvgReview = (reviews) =>{
    if(!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum , review)=>sum + review.rating, 0)
    return (total/reviews.length).toFixed(1)
}

const avgRating = calculateAvgReview(reviews)





  return (
    <div
      className="
        group relative w-[340px]
        rounded-2xl
        bg-[#0c1018]
        border border-white/10
        overflow-hidden
        shadow-[0_30px_90px_rgba(0,0,0,0.75)]
        transition-all duration-500
        hover:-translate-y-2
      "
      onClick={() => navigate(`/viewcourse/${id}`)}
    >
      {/* IMAGE — FULL VIEW */}
      <div className="relative w-full h-[210px] bg-black flex items-center justify-center">
        <img
          src={thumbnail}
          alt={title}
          className="
            max-w-full max-h-full
            object-cover
            
            
          "
        />

        
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

        {/* CATEGORY */}
        <span
          className="
            absolute bottom-4 left-4
            px-3 py-1
            rounded-full
            text-[11px] uppercase tracking-widest
            bg-white/10 backdrop-blur
            text-white/80
            border border-white/20
          "
        >
          {category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-4">
        <h2
          className="
            text-base font-medium
            leading-snug
            text-white
            line-clamp-2
          "
        >
          {title}
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-white">
            ₹ {price}
          </span>

          <span className="flex items-center gap-1 text-sm text-white/60">
            <FaStar className="text-amber-400" />
            {avgRating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
