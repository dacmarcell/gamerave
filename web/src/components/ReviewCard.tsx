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
    <div className="flex w-full p-6 max-w-2xl flex-col rounded-2xl glass-morphism border border-white/5 my-4 transition-all hover:border-primary/20">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <h5 className="text-lg font-bold text-white">
            {review.title}
          </h5>
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            {review.likes} Helpful Reactions
          </span>
        </div>
        <div className="flex text-amber-500 text-xs">
          ★★★★★
        </div>
      </div>
      
      <div className="relative">
        <span className="absolute -left-2 -top-2 text-4xl text-primary/20 font-serif">&quot;</span>
        <p className="text-slate-300 italic leading-relaxed pl-4">
          {review.description}
        </p>
      </div>
    </div>
  );
}

export default ReviewCard;
