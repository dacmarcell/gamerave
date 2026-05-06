"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";

interface GameLikeButtonProps {
  gameId: number;
  initialLikes: number;
  className?: string;
}

export default function GameLikeButton({
  gameId,
  initialLikes,
  className = "",
}: GameLikeButtonProps) {
  const { user, userLikes, toggleGameLikeLocally } = useAuth();
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isLiked = userLikes?.gameLikes.includes(gameId);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      router.push("/login");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const res = await apiFetch(`/like/${gameId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!res.ok) throw new Error("Failed to like game");
      const updatedGame = res.data;
      setLikes(updatedGame.likes);
      toggleGameLikeLocally(gameId);
    } catch (err) {
      console.error(err);
      toast.error("Error toggling like.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center gap-1 transition-colors ${className} ${
        isLiked
          ? "bg-amber-500/20 text-amber-400 border border-amber-500/50"
          : "bg-amber-500/5 hover:bg-amber-500/10 text-amber-500/70 border border-amber-500/10"
      } ${loading ? "opacity-50 cursor-wait" : ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill={isLiked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      {likes}
    </button>
  );
}
