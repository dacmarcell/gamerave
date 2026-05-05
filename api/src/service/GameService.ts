import { AppDataSource } from '../data-source';
import { Game } from '../entity/Game';
import { Review } from '../entity/Review';
import { GameLike } from '../entity/GameLike';

interface CreateGameDto {
  name: string;
}

export class GameService {
  private gameRepository = AppDataSource.getRepository(Game);
  private reviewsRepository = AppDataSource.getRepository(Review);
  private gameLikeRepository = AppDataSource.getRepository(GameLike);

  async all() {
    return this.gameRepository.find({
      relations: {
        reviews: true
      },
      order: {
        likes: 'DESC'
      }
    });
  }

  async one(id: number) {
    return await this.gameRepository.findOne({
      where: { id },
      relations: {
        reviews: true
      }
    });
  }

  async save(createGameDto: CreateGameDto) {
    const { name } = createGameDto;
    const existingGame = await this.gameRepository.findOneBy({ name });
    if (existingGame) throw new Error('Game already exists');

    const newGame = this.gameRepository.create({
      name,
      likes: 0
    });
    return await this.gameRepository.save(newGame);
  }

  async remove(id: number) {
    const gameToRemove = await this.gameRepository.findOneBy({ id });
    if (!gameToRemove) return null;

    // TypeORM with CASCADE on the entity level would be better, but doing it manually here
    await this.gameLikeRepository.delete({ game: id as any });
    await this.reviewsRepository.delete({ game: id as any });
    await this.gameRepository.remove(gameToRemove);
    return true;
  }

  async like(id: number, userId: number) {
    const game = await this.gameRepository.findOneBy({ id });
    if (!game) throw new Error('Game not found');

    const existingLike = await this.gameLikeRepository.findOne({
      where: {
        game: { id: game.id },
        user: { id: userId }
      }
    });

    if (existingLike) {
      // Toggle off (dislike)
      await this.gameLikeRepository.remove(existingLike);
      game.likes--;
      return await this.gameRepository.save(game);
    } else {
      // Toggle on (like)
      const newLike = this.gameLikeRepository.create({
        game: { id: game.id } as any,
        user: { id: userId } as any
      });
      await this.gameLikeRepository.save(newLike);
      game.likes++;
      return await this.gameRepository.save(game);
    }
  }
}
