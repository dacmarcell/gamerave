import { GameService } from '../service/GameService';
import { Request, Response } from 'express';

export class GameController {
  private gameService: GameService;

  constructor() {
    this.gameService = new GameService();
  }

  async all() {
    return this.gameService.all();
  }

  async one(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const game = await this.gameService.one(id);
    if (!game) {
      response.status(404);
      return { message: 'Game not found' };
    }
    return game;
  }

  async save(request: Request, response: Response) {
    try {
      const game = await this.gameService.save(request.body);
      response.status(201);
      return game;
    } catch (error: any) {
      response.status(400);
      return { message: error.message };
    }
  }

  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const success = await this.gameService.remove(id);
    if (!success) {
      response.status(404);
      return { message: 'Game not found' };
    }
    return { message: 'Game removed successfully' };
  }

  async like(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const { userId } = request.body;

    if (!userId) {
      response.status(401);
      return { message: 'Unauthorized: userId is required' };
    }

    try {
      const game = await this.gameService.like(id, userId);
      return game;
    } catch (error: any) {
      response.status(400);
      return { message: error.message };
    }
  }
}
