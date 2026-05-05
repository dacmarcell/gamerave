import { GameService } from '../service/GameService';
import { Request } from 'express';

export class GameController {
  private gameService: GameService;

  constructor() {
    this.gameService = new GameService();
  }

  async all() {
    return this.gameService.all();
  }

  async one(request: Request) {
    const id = parseInt(request.params.id);
    return await this.gameService.one(id);
  }

  async save(request: Request) {
    return await this.gameService.save(request.body);
  }

  async remove(request: Request) {
    const id = parseInt(request.params.id);
    return await this.gameService.remove(id);
  }

  async like(request: Request) {
    const id = parseInt(request.params.id);
    return await this.gameService.like(id);
  }

  async dislike(request: Request) {
    const id = parseInt(request.params.id);
    return await this.gameService.dislike(id);
  }
}
