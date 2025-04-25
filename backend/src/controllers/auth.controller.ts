import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
    async loginDoctor(req: Request, res: Response) {
        try {
            let result = await authService.loginDoctor(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }
}