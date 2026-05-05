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
    await this.reviewsRepository.delete({ game: id as any });
    await this.gameRepository.remove(gameToRemove);
    return true;
  }

  async like(id: number) {
    const game = await this.gameRepository.findOneBy({ id });
    if (!game) return null;
    game.likes++;
    return await this.gameRepository.save(game);
  }

  async dislike(id: number) {
    const game = await this.gameRepository.findOneBy({ id });
    if (!game) return null;
    game.likes--;
    return await this.gameRepository.save(game);
  }
}
