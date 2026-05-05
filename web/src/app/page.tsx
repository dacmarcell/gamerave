import GameCard from "@/components/GameCard";
import { BASE_URL } from "@/constants";
import { Game } from "@/types";

export const dynamic = "force-dynamic";

async function getGamesAction() {
  try {
    const res = await fetch(`${BASE_URL}/games`, { cache: "no-store" });
    if (!res.ok) return { games: [], error: "Failed to fetch games" };
    const games: Game[] = await res.json();
    return { games };
  } catch {
    return { games: [], error: "API connection refused" };
  }
}

export default async function GamesPage() {
  const { games, error } = await getGamesAction();

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 py-12">
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-2">
          The Gamer&apos;s Choice
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Discover your next <br />
          <span className="gradient-text">Gaming Adventure</span>
        </h1>
        <p className="text-slate-400 max-w-2xl text-lg">
          Explore curated reviews and real-time ratings from a community of
          hardcore gamers. Find what&apos;s hot and what&apos;s not in the world
          of gaming.
        </p>
      </section>

      {/* Games Grid */}
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-white">Trending Games</h2>
            <p className="text-slate-500 text-sm">
              Most liked and reviewed this week
            </p>
          </div>
        </div>

        {error ? (
          <div className="glass-morphism p-12 rounded-2xl text-center border-red-500/20 bg-red-500/5">
            <span className="text-red-400 font-bold mb-2 block">
              System Error
            </span>
            <p className="text-slate-400">
              {error}. Please check if the API is running.
            </p>
          </div>
        ) : games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="glass-morphism p-12 rounded-2xl text-center">
            <p className="text-slate-400">
              No games found in the database. Run the seed script!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
