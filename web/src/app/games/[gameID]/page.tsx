import BackButton from "@/components/BackButton";
import ReviewCard from "@/components/ReviewCard";
import { BASE_URL } from "@/constants";
import { Game as GameType } from "@/types";

function validateGameID(id: string) {
  const validID = parseInt(id);

  if (isNaN(validID)) {
    throw new Error("ID de Jogo deve ser um número...");
  } else if (validID < 1) {
    throw new Error("ID de Jogo não pode ser menor que 1...");
  }

  return validID;
}

export async function getGameByIDAction(id: string) {
  const validID = validateGameID(id);

  const res = await fetch(`${BASE_URL}/games/${validID}`);
  const game: GameType = await res.json();

  return { game };
}

async function Game({ params }: { params: Promise<{ gameID: string }> }) {
  const gameID = (await params).gameID;
  const { game } = await getGameByIDAction(gameID);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1>{game.name}</h1>
      <BackButton href="/games" />

      {game.reviews
        ? game.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        : null}
    </div>
  );
}

export default Game;
