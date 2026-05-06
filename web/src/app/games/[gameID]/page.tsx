import ReviewHeaderActions from "@/components/ReviewHeaderActions";
import ShareButton from "@/components/ShareButton";
import ReviewCard from "@/components/ReviewCard";
import GameLikeButton from "@/components/GameLikeButton";
import { Game as GameType } from "@/types";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export const dynamic = "force-dynamic";

async function getGameByIDAction(id: string) {
  try {
    const validID = parseInt(id);
    if (isNaN(validID)) return { error: "Invalid Game ID" };

    const res = await apiFetch(`/games/${validID}`, { cache: "no-store" });

    if (res.status === 404) return { error: "Game not found" };
    if (!res.ok) return { error: "Failed to fetch game details" };

    const game: GameType = res.data;

    if (typeof game === "string")
      return { error: "Game not found in database" };

    return { game };
  } catch {
    return { error: "API connection error" };
  }
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ gameID: string }>;
}) {
  const gameID = (await params).gameID;
  const { game, error } = await getGameByIDAction(gameID);

  if (error || !game) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6">
        <div className="text-6xl">😕</div>
        <h1 className="text-3xl font-bold text-white">
          {error || "Something went wrong"}
        </h1>
        <p className="text-slate-400">
          We couldn&apos;t find the game you&apos;re looking for.
        </p>
        <Link href="/" className="text-primary hover:underline font-bold">
          ← Back to Games
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 pb-20">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-slate-500 hover:text-white transition-colors"
        >
          Games
        </Link>
        <span className="text-slate-700">/</span>
        <span className="text-slate-300">{game.name}</span>
      </div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
        <div className="flex flex-col gap-2">
          <span className="text-primary font-bold text-sm tracking-widest uppercase">
            Game Details
          </span>
          <h1 className="text-5xl font-black text-white">{game.name}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs text-slate-500 font-bold uppercase">
              Popularity
            </span>
            <GameLikeButton
              gameId={game.id}
              initialLikes={game.likes}
              className="text-2xl font-bold bg-transparent hover:bg-white/5 px-2 py-1 -mr-2 rounded-lg"
            />
          </div>
          <ShareButton gameName={game.name} />
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <ReviewHeaderActions gameId={game.id} />

          <div className="flex flex-col gap-4">
            {game.reviews && game.reviews.length > 0 ? (
              game.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="glass-morphism p-12 rounded-2xl text-center border-dashed border-white/10">
                <p className="text-slate-500 italic">
                  No reviews yet. Be the first to review {game.name}!
                </p>
              </div>
            )}
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="glass-morphism p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-bold text-white">Quick Stats</h3>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-400">Total Reviews</span>
              <span className="text-white font-medium">
                {game.reviews?.length || 0}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-400">Rank</span>
              <span className="text-white font-medium">#1 Trending</span>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
