import { AuthService } from "../service/AuthService";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { GameLike } from "../entity/GameLike";
import { ReviewLike } from "../entity/ReviewLike";

export class AuthController {
    private readonly authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const result = await this.authService.register(email, password);
            response.status(201);
            return result;
        } catch (error: any) {
            response.status(400);
            return { message: error.message };
        }
    }

    async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const result = await this.authService.login(email, password);
            response.status(200);
            return result;
        } catch (error: any) {
            response.status(401);
            return { message: error.message };
        }
    }

    async getUserLikes(request: Request, response: Response) {
        try {
            const userId = parseInt(request.params.id);
            if (isNaN(userId)) {
                response.status(400);
                return { message: "Invalid user ID" };
            }

            const gameLikes = await AppDataSource.getRepository(GameLike).find({
                where: { user: { id: userId } },
                relations: ['game']
            });

            const reviewLikes = await AppDataSource.getRepository(ReviewLike).find({
                where: { user: { id: userId } },
                relations: ['review']
            });

            return {
                gameLikes: gameLikes.map(gl => gl.game.id),
                reviewLikes: reviewLikes.map(rl => rl.review.id)
            };
        } catch (error: any) {
            response.status(500);
            return { message: error.message };
        }
    }
}
