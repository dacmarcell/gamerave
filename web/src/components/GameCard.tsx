"use client";

import { usePathname, useRouter } from "next/navigation";

interface GameCardProps {
  game: {
    id: number;
    likes: number;
    name: string;
    reviews: {
      title: string;
      description: string;
      likes: number;
    }[];
  };
}

function GameCard(props: GameCardProps) {
  const { game } = props;

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 ${
        game.id ? "hover:cursor-pointer" : ""
      }`}
      {...(game.id
        ? { onClick: () => router.push(`${pathname}/${game.id}`) }
        : {})}
    >
      <span className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
        <span className="text-sm font-medium text-slate-600">Game</span>
      </span>

      <span className="p-4">
        <h5 className="mb-2 text-slate-800 text-xl font-semibold">
          {game.name}
        </h5>
      </span>
    </div>
  );
}

export default GameCard;
