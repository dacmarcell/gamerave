"use client";

import { useRouter } from "next/navigation";

interface GameCardProps {
  game: {
    id: number;
    likes: number;
    name: string;
    reviews?: {
      id: number;
      title: string;
      description: string;
      likes: number;
    }[];
  };
}

function GameCard(props: GameCardProps) {
  const { game } = props;
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/games/${game.id}`)}
      className="group relative glass-morphism rounded-2xl overflow-hidden card-hover cursor-pointer p-6 flex flex-col gap-4 border border-white/5"
    >
      <div className="absolute top-0 right-0 p-4">
        <div className="bg-amber-500/10 text-amber-500 text-xs font-bold px-2 py-1 rounded-md border border-amber-500/20">
          ★ {game.likes}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">New Entry</span>
        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
          {game.name}
        </h3>
      </div>

      <div className="mt-auto flex justify-between items-center text-sm">
        <span className="text-slate-400">
          {game.reviews?.length || 0} Reviews
        </span>
        <button className="text-primary font-bold flex items-center gap-1 group/btn">
          View Details
          <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
        </button>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

export default GameCard;
