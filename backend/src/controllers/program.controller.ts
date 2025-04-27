import { Request, Response } from "express";
import { ExtendedRequest, verifyToken} from "../middlewares/verificationToken";
import { ProgramService } from "../services/program.service";

const programService = new ProgramService();

export class ProgramController {
    async createProgram(req: Request, res: Response) {
        try {
            let result = await programService.createProgram(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async updateProgram(req: Request, res: Response) {
        try {
            let result = await programService.updateProgram(req.body, req.params.programId);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async fetchProgram(req: Request, res: Response) {
        try {
            let result = await programService.fetchProgram(req.params.programId);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async fetchPrograms(req: Request, res: Response) {
        try {
            let result = await programService.fetchPrograms();
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }
}