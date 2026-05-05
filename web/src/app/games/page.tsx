import GameCard from "@/components/GameCard";
import { BASE_URL } from "@/constants";
import { Game } from "@/types";

export async function getGamesAction() {
  const res = await fetch(`${BASE_URL}/games`);
  const games: Game[] = await res.json();

  return { games };
}

async function GamesPage() {
  const { games } = await getGamesAction();

  return (
    <div className="grid grid-cols-3 gap-4 p-4 w-full h-full">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export default GamesPage;
