import React from "react";
import { FaRegStar,FaStar } from "react-icons/fa";

function ReviewCard({comment,rating,avgRating,totalReviews,photoUrl,
  name,description,courseTitle,}) {
  return (
    <div className="w-[380px] shrink-0 rounded-2xl  flex-none 
      bg-white/5 border border-white/10 backdrop-blur-xl
      p-6 transition hover:border-emerald-400/40">

      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-widest text-emerald-400">
          {courseTitle}
        </span>

        <div className="flex items-center gap-1 text-xs">
          <span className="text-white font-semibold">
            {avgRating.toFixed(1)}
            {/* {Number(avgRating || 0).toFixed(1)} */}

          </span>
          <span className="text-amber-400">★</span>
          <span className="text-white/40">
            ({totalReviews})
          </span>
        </div>
      </div>

    
      <p className="text-white/85 text-sm leading-relaxed mb-6">
        “{comment}”
      </p>

      {/* User */}
      <div className="flex items-center gap-4">
        <img
          src={photoUrl}
          alt={name}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-white font-semibold text-sm">{name}</h3>
          <p className="text-white/50 text-xs">{description}</p>
        </div>

        
        <div className="flex text-amber-400 text-xs">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < rating ? <FaStar/> : <FaRegStar/>}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
