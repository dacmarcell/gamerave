import { AppDataSource } from "../data-source";
import { Game } from "../entity/Game";
import { Review } from "../entity/Review";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";

async function seed() {
  try {
    console.log("Connecting to database...");
    await AppDataSource.initialize();
    
    const gameRepository = AppDataSource.getRepository(Game);
    const reviewRepository = AppDataSource.getRepository(Review);
    const userRepository = AppDataSource.getRepository(User);

    console.log("Cleaning existing data...");
    await AppDataSource.query('TRUNCATE TABLE "review", "game", "user" RESTART IDENTITY CASCADE;');

    console.log("Seeding User...");
    const passwordHash = await bcrypt.hash("password123", 10);
    const defaultUser = userRepository.create({
      email: "gamer@example.com",
      passwordHash
    });
    const savedUser = await userRepository.save(defaultUser);
    console.log(`Saved user: ${savedUser.email}`);

    console.log("Seeding Games...");
    const games = [
      { name: "The Witcher 3: Wild Hunt", likes: 1500 },
      { name: "Elden Ring", likes: 2500 },
      { name: "Cyberpunk 2077", likes: 1200 },
      { name: "Red Dead Redemption 2", likes: 2000 },
      { name: "Hades", likes: 800 },
    ];

    const savedGames = await gameRepository.save(games);
    console.log(`Saved ${savedGames.length} games.`);

    console.log("Seeding Reviews...");
    const reviews = [
      { 
        title: "Um marco nos RPGs", 
        description: "A história e os personagens são inesquecíveis. Geralt nunca esteve melhor.", 
        likes: 120, 
        game: savedGames[0].id as any,
        user: savedUser.id as any
      },
      { 
        title: "Goty 2022 com certeza", 
        description: "Difícil, mas extremamente gratificante. O mundo aberto é o melhor que já vi.", 
        likes: 340, 
        game: savedGames[1].id as any,
        user: savedUser.id as any
      },
      { 
        title: "Redenção total", 
        description: "Depois de tantos patches, o jogo finalmente entregou o que prometeu. Night City é linda.", 
        likes: 85, 
        game: savedGames[2].id as any,
        user: savedUser.id as any
      },
      { 
        title: "Obra de arte", 
        description: "O nível de detalhe é absurdo. Arthur Morgan é um dos melhores protagonistas da história.", 
        likes: 210, 
        game: savedGames[3].id as any,
        user: savedUser.id as any
      },
      { 
        title: "Viciante", 
        description: "A jogabilidade é perfeita e o diálogo entre os deuses é fantástico.", 
        likes: 95, 
        game: savedGames[4].id as any,
        user: savedUser.id as any
      },
    ];

    await reviewRepository.save(reviews);
    console.log(`Saved ${reviews.length} reviews.`);

    console.log("Seeding complete successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await AppDataSource.destroy();
  }
}

seed();
