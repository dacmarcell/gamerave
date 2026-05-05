import { AppDataSource } from '../data-source';
import { Game } from '../entity/Game';
import { Review } from '../entity/Review';

interface CreateGameDto {
  name: string;
}

export class GameService {
  private gameRepository = AppDataSource.getRepository(Game);
  private reviewsRepository = AppDataSource.getRepository(Review);

  async all() {
    return this.gameRepository.find({
      relations: {
        reviews: true
      }
    });
  }

  async one(id: number) {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: {
        reviews: true
      }
    });
    return game ?? 'unregistered game';
  }

  async save(createGameDto: CreateGameDto) {
    const { name } = createGameDto;
    const game = await this.gameRepository.findOneBy({ name });
    if (game) return 'game already exists';
    const newGame = Object.assign(new Game(), {
      name,
      likes: 0
    });
    return await this.gameRepository.save(newGame);
  }

  async remove(id: number) {
    const gameToRemove = await this.gameRepository.findOneBy({ id });
    if (!gameToRemove) return 'this game not exist';
    const reviewsToRemove = await this.reviewsRepository.find({
      where: { game: gameToRemove.id }
    });
    if (reviewsToRemove) {
      for (const review of reviewsToRemove)
        await this.reviewsRepository.remove(review);
      await this.gameRepository.remove(gameToRemove);
      return 'game and your reviews has been removed';
    }
    await this.gameRepository.remove(gameToRemove);
    return 'game has been removed';
  }

  async like(id: number) {
    let game = await this.gameRepository.findOneBy({ id });
    if (!game) return 'game not found';
    game.likes++;
    await this.gameRepository.save(game);
    return {
      name: game.name,
      total_likes: game.likes,
      message: `${game.name} liked.`
    };
  }

  async dislike(id: number) {
    let game = await this.gameRepository.findOneBy({ id });
    if (!game) return 'game not found';
    game.likes--;
    await this.gameRepository.save(game);
    return {
      name: game.name,
      total_likes: game.likes,
      message: `${game.name} disliked.`
    };
  }
}
