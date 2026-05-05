import { getAuthCookie } from "@/actions/auth";
import { redirect } from "next/navigation";
import ReviewCard from "@/components/ReviewCard";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export const dynamic = "force-dynamic";

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

async function getUserReviews(userId: number) {
  try {
    const res = await apiFetch(`/users/${userId}/reviews`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function ProfileReviewsPage() {
  const token = await getAuthCookie();

  if (!token) {
    redirect("/login");
  }

  const decoded = parseJwt(token);
  if (!decoded || !decoded.userId) {
    redirect("/login");
  }

  const reviews = await getUserReviews(decoded.userId);

  return (
    <div className="flex flex-col gap-10 pb-20">
      <header className="flex flex-col gap-2 border-b border-white/5 pb-10">
        <span className="text-primary font-bold text-sm tracking-widest uppercase">
          My Profile
        </span>
        <h1 className="text-5xl font-black text-white">My Reviews</h1>
        <p className="text-slate-400">
          Manage all your game reviews in one place.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        {reviews.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          reviews.map((review: any) => (
            <div key={review.id} className="relative">
              {review.game && (
                <div className="absolute top-8 right-6 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md z-10">
                  Game:{" "}
                  <Link
                    href={`/games/${review.game.id}`}
                    className="text-primary hover:underline"
                  >
                    {review.game.name}
                  </Link>
                </div>
              )}
              <ReviewCard review={review} />
            </div>
          ))
        ) : (
          <div className="glass-morphism p-12 rounded-2xl text-center border-dashed border-white/10">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-white mb-2">
              No reviews yet
            </h3>
            <p className="text-slate-500 italic mb-6">
              You haven&apos;t written any reviews. Share your thoughts on a
              game!
            </p>
            <Link
              href="/"
              className="bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Explore Games
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
