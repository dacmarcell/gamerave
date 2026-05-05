"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { BASE_URL } from "@/constants";

interface ReviewLikeButtonProps {
  reviewId: number;
  initialLikes: number;
}

export default function ReviewLikeButton({ reviewId, initialLikes }: ReviewLikeButtonProps) {
  const { user, userLikes, toggleReviewLikeLocally } = useAuth();
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  const isLiked = userLikes?.reviewLikes.includes(reviewId);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      alert("You must be logged in to say this review is helpful!");
      return;
    }
    
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/like-review/${reviewId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!res.ok) throw new Error("Failed to like review");
      
      const updatedReview = await res.json();
      setLikes(updatedReview.likes);
      toggleReviewLikeLocally(reviewId);
    } catch (err) {
      console.error(err);
      alert("Error toggling like.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`mt-4 flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-md border transition-colors
        ${loading ? "opacity-50 cursor-wait" : ""}
        ${isLiked 
          ? "bg-primary text-white border-primary" 
          : "text-primary hover:bg-primary/10 border-primary/20 hover:border-primary/50"
        }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
      {likes} Helpful
    </button>
  );
}
