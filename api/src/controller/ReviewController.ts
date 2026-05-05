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
      const { userId } = request.body;
      if (!userId) {
        response.status(401);
        return { message: 'Unauthorized: userId is required' };
      }
      const review = await this.reviewService.update(id, request.body, userId);
      if (!review) {
        response.status(404);
        return { message: 'Review not found' };
      }
      return review;
    } catch (error: any) {
      if (error.message === 'Unauthorized') response.status(403);
      else response.status(400);
      return { message: error.message };
    }
  }

  async remove(request: Request, response: Response) {
    try {
      const id = parseInt(request.params.id);
      const userId = parseInt(request.query.userId as string);
      
      if (!userId || isNaN(userId)) {
        response.status(401);
        return { message: 'Unauthorized: userId is required in query params' };
      }

      const success = await this.reviewService.remove(id, userId);
      if (!success) {
        response.status(404);
        return { message: 'Review not found' };
      }
      return { message: 'Review removed successfully' };
    } catch (error: any) {
      if (error.message === 'Unauthorized') response.status(403);
      else response.status(400);
      return { message: error.message };
    }
  }

  async getByUser(request: Request, response: Response) {
    try {
      const userId = parseInt(request.params.id);
      if (isNaN(userId)) {
        response.status(400);
        return { message: 'Invalid user ID' };
      }
      return await this.reviewService.getByUser(userId);
    } catch (error: any) {
      response.status(500);
      return { message: error.message };
    }
  }

  async likeReview(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const { userId } = request.body;

    if (!userId) {
      response.status(401);
      return { message: 'Unauthorized: userId is required' };
    }

    try {
      const review = await this.reviewService.likeReview(id, userId);
      return review;
    } catch (error: any) {
      response.status(400);
      return { message: error.message };
    }
  }
}
