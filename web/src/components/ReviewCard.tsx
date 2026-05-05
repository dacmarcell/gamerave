"use client";

import { useState } from "react";
import ReviewLikeButton from "./ReviewLikeButton";
import { useAuth } from "@/context/AuthContext";
import EditReviewModal from "./EditReviewModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useRouter } from "next/navigation";

interface ReviewCardProps {
  review: {
    id: number;
    title: string;
    description: string;
    likes: number;
    user?: { id: number };
  };
}

function ReviewCard(props: ReviewCardProps) {
  const { review } = props;
  const { user } = useAuth();
  const router = useRouter();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const isOwner = user?.id === review.user?.id;

  const handleSuccess = () => {
    router.refresh();
  };

  return (
    <>
      <div className="flex w-full p-6 max-w-2xl flex-col rounded-2xl glass-morphism border border-white/5 my-4 transition-all hover:border-primary/20 relative group">
        {isOwner && (
          <div className="absolute top-2 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditOpen(true)}
              className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
              title="Edit Review"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
              </svg>
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
              title="Delete Review"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        )}

        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col pr-16">
            <h5 className="text-lg font-bold text-white">{review.title}</h5>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Review
            </span>
          </div>
          <div className="flex text-amber-500 text-xs mt-1">★★★★★</div>
        </div>

        <div className="relative">
          <span className="absolute -left-2 -top-2 text-4xl text-primary/20 font-serif">
            &quot;
          </span>
          <p className="text-slate-300 italic leading-relaxed pl-4">
            {review.description}
          </p>
        </div>

        <div className="mt-2">
          <ReviewLikeButton reviewId={review.id} initialLikes={review.likes} />
        </div>
      </div>

      {isOwner && (
        <>
          <EditReviewModal
            review={review}
            userId={user?.id}
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            onSuccess={handleSuccess}
          />
          <DeleteConfirmModal
            reviewId={review.id}
            userId={user?.id}
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onSuccess={handleSuccess}
          />
        </>
      )}
    </>
  );
}

export default ReviewCard;
