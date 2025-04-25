import { Request, Response } from "express";
import { ExtendedRequest, verifyToken, getIdFromToken } from "../middlewares/verificationToken";
import { DoctorService } from "../services/doctor.service";

const doctorService = new DoctorService();

export class DoctorController {
    async createDoctor(req: Request, res: Response) {
        try {
            let result = await doctorService.createDoctor(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async updateDoctor(req: ExtendedRequest, res: Response) {
        try {
            let result = await doctorService.updateDoctor(req.body, getIdFromToken(req));
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async fetchDoctor(req: Request, res: Response) {
        try {
            let result = await doctorService.fetchDoctor(req.params.doctorId);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async fetchDoctors(res: Response) {
        try {
            let result = await doctorService.fetchDoctors();
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async changePassword(req: ExtendedRequest, res: Response) {
        try {
            let result = await doctorService.changePassword(getIdFromToken(req), req.body.oldPassword, req.body.newPassword);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }
}