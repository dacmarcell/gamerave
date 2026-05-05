import { ReviewService } from '../service/ReviewService';
import { Request } from 'express';

export class ReviewController {
  private readonly reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  async all() {
    return this.reviewService.all();
  }

  async one(request: Request) {
    const id = parseInt(request.params.id);
    return await this.reviewService.one(id);
  }

  async save(request: Request) {
    return await this.reviewService.save(request.body);
  }

  async update(request: Request) {
    const id = parseInt(request.params.id);
    return await this.reviewService.update(id, request.body);
  }

  async remove(request: Request) {
    const id = parseInt(request.params.id);
    return await this.reviewService.remove(id);
  }

  async likeReview(request: Request) {
    const id = parseInt(request.params.id);
    return await this.reviewService.likeReview(id);
  }

  async dislikeReview(request: Request) {
    const id = parseInt(request.params.id);
    return await this.reviewService.dislikeReview(id);
  }
}
