import { AuthService } from "../service/AuthService";
import { Request, Response } from "express";

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
}
