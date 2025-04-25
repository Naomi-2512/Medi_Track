import { Request, Response } from "express";
import { ExtendedRequest, verifyToken, getIdFromToken } from "../middlewares/verificationToken";
import { EnrollmentService } from "../services/enrollment.service";

const enrollmentService = new EnrollmentService();

export class EnrollmentController {
    async createEnrollment(req: Request, res: Response) {
        try {
            let result = await enrollmentService.createEnrollment(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async updateEnrollment(req: Request, res: Response) {
        try {
            let result = await enrollmentService.updateEnrollment(req.body, req.params.enrollmentId);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async fetchEnrollment(req: Request, res: Response) {
        try {
            let result = await enrollmentService.fetchEnrollment(req.params.enrollmentId);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async fetchEnrollments(res: Response) {
        try {
            let result = await enrollmentService.fetchEnrollments();
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }
}