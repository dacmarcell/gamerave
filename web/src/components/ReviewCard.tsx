interface ReviewCardProps {
  review: {
    title: string;
    description: string;
    likes: number;
  };
}

async function ReviewCard(props: ReviewCardProps) {
  const { review } = props;

  return (
    <div className="flex w-full p-4 max-w-lg flex-col rounded-lg bg-white shadow-sm border border-slate-200 my-6">
      <div className="flex items-center gap-4 text-slate-800">
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between">
            <h5 className="text-xl font-semibold text-slate-800">
              {review.title}
            </h5>
          </div>
          <p className="text-xs uppercase font-bold text-slate-500 mt-0.5">
            {review.likes} likes
          </p>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-base text-slate-600 font-light leading-normal">
          &quot;{review.description}&quot;
        </p>
      </div>
    </div>
  );
}

export default ReviewCard;
