import { CreateReviewDto, UpdateReviewDto } from '../dtos/review';
import { AppDataSource } from '../data-source';
import { Review } from '../entity/Review';
import { Game } from '../entity/Game';
import { User } from '../entity/User';

export class ReviewService {
  private reviewRepository = AppDataSource.getRepository(Review);
  private gameRepository = AppDataSource.getRepository(Game);
  private userRepository = AppDataSource.getRepository(User);

  async all() {
    return this.reviewRepository.find();
  }

  async one(id: number) {
    return await this.reviewRepository.findOneBy({ id });
  }

  async save(createReviewDto: CreateReviewDto) {
    const { title, description, gameName, gameId, userId } = createReviewDto;
    
    let game;
    if (gameId) {
      game = await this.gameRepository.findOneBy({ id: gameId });
    } else if (gameName) {
      game = await this.gameRepository.findOneBy({ name: gameName });
    }
    
    if (!game) throw new Error('Game not found');

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    const newReview = this.reviewRepository.create({
      title,
      description,
      likes: 0,
      game: game.id as any,
      user: user.id as any
    });
    return await this.reviewRepository.save(newReview);
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const { title, description, gameName } = updateReviewDto;
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) return null;

    if (gameName) {
      const game = await this.gameRepository.findOneBy({ name: gameName });
      if (!game) throw new Error('Game not found');
      review.game = game.id as any;
    }

    if (title) review.title = title;
    if (description) review.description = description;

    return await this.reviewRepository.save(review);
  }

  async remove(id: number) {
    const reviewToRemove = await this.reviewRepository.findOneBy({ id });
    if (!reviewToRemove) return null;
    await this.reviewRepository.remove(reviewToRemove);
    return true;
  }

  async likeReview(id: number) {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) return null;
    review.likes++;
    return await this.reviewRepository.save(review);
  }

  async dislikeReview(id: number) {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) return null;
    review.likes--;
    return await this.reviewRepository.save(review);
  }
}
