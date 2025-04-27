import { Router } from "express";
import { verifyToken } from "../middlewares/verificationToken";
import { ProgramController } from "../controllers/program.controller";

const programController = new ProgramController();

export const programRouter = Router();

programRouter.post('/create', verifyToken, programController.createProgram);
programRouter.put('/update/:programId', verifyToken, programController.updateProgram);
programRouter.get('/fetchOne/:programId', verifyToken, programController.fetchProgram);
programRouter.get('/fetchAll', verifyToken, programController.fetchPrograms);