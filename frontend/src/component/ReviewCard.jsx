import React, { useState } from "react";

function ReviewCard({ comment, rating, photoUrl, name, description, courseTitle }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative w-full max-w-[420px] rounded-2xl 
      bg-gradient-to-b from-white/10 to-white/5 
      backdrop-blur-xl border border-white/10 p-6
      transition-all duration-500 hover:-translate-y-2">

      {/* Course */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
          {courseTitle}
        </span>
        <div className="flex text-amber-400 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < rating ? "★" : "☆"}</span>
          ))}
        </div>
      </div>

      {/* Comment */}
      <p
        className={`text-white/90 text-sm leading-relaxed transition-all ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        “{comment}”
      </p>

      {comment.length > 120 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs text-emerald-400 hover:underline"
        >
          {expanded ? "Show less" : "Read full review"}
        </button>
      )}

      {/* User */}
      <div className="flex items-center gap-4 mt-6">
        <img
          src={photoUrl}
          alt={name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-400/40"
        />
        <div>
          <h3 className="text-white font-semibold text-sm">{name}</h3>
          <p className="text-white/60 text-xs">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
