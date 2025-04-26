import { Router } from "express";
import { verifyToken } from "../middlewares/verificationToken";
import { DoctorController } from "../controllers/doctor.controller";

const doctorController = new DoctorController();

export const doctorRouter = Router();

doctorRouter.post('/create', doctorController.createDoctor);
doctorRouter.put('/update/:doctorId', verifyToken, doctorController.updateDoctor);
doctorRouter.get('/fetchOne/:doctorId', verifyToken, doctorController.fetchDoctor);
doctorRouter.get('/fetchAll', verifyToken, doctorController.fetchDoctors);
doctorRouter.patch('/changePassword/:doctorId', verifyToken, doctorController.changePassword);