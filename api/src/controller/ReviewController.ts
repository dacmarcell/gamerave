import { ReviewService } from '../service/ReviewService';
import { Request, Response } from 'express';

export class ReviewController {
  private readonly reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  async all() {
    return this.reviewService.all();
  }

  async one(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const review = await this.reviewService.one(id);
    if (!review) {
      response.status(404);
      return { message: 'Review not found' };
    }
    return review;
  }

  async save(request: Request, response: Response) {
    try {
      const review = await this.reviewService.save(request.body);
      response.status(201);
      return review;
    } catch (error: any) {
      response.status(400);
      return { message: error.message };
    }
  }

  async update(request: Request, response: Response) {
    try {
      const id = parseInt(request.params.id);
      const review = await this.reviewService.update(id, request.body);
      if (!review) {
        response.status(404);
        return { message: 'Review not found' };
      }
      return review;
    } catch (error: any) {
      response.status(400);
      return { message: error.message };
    }
  }

  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const success = await this.reviewService.remove(id);
    if (!success) {
      response.status(404);
      return { message: 'Review not found' };
    }
    return { message: 'Review removed successfully' };
  }

  async likeReview(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const review = await this.reviewService.likeReview(id);
    if (!review) {
      response.status(404);
      return { message: 'Review not found' };
    }
    return review;
  }

  async dislikeReview(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const review = await this.reviewService.dislikeReview(id);
    if (!review) {
      response.status(404);
      return { message: 'Review not found' };
    }
    return review;
  }
}
