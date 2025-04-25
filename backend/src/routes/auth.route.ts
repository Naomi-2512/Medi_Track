import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const authController = new AuthController();

export const authRouter = Router();

authRouter.post('/login', authController.loginDoctor);