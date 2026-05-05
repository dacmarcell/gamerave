"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import WriteReviewModal from "./WriteReviewModal";
import { useRouter } from "next/navigation";

interface ReviewHeaderActionsProps {
  gameId: number;
}

export default function ReviewHeaderActions({ gameId }: ReviewHeaderActionsProps) {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    // Refresh the current route to fetch updated reviews
    router.refresh();
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Player Reviews</h2>
        {user && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary-hover text-white text-sm font-bold px-4 py-2 rounded-lg transition-all active:scale-95"
          >
            Write a Review
          </button>
        )}
      </div>

      {user && (
        <WriteReviewModal
          gameId={gameId}
          userId={user.id}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
