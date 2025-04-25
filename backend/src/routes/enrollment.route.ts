import { Router } from "express";
import { verifyToken } from "../middlewares/verificationToken";
import { EnrollmentController } from "../controllers/enrollment.controller";

const enrollmentController = new EnrollmentController();

export const enrollmentRouter = Router();

enrollmentRouter.post('/create', verifyToken, enrollmentController.createEnrollment);
enrollmentRouter.put('/update:enrollmentId', verifyToken, enrollmentController.updateEnrollment);
enrollmentRouter.get('/fetchOne:enrollmentId', verifyToken, enrollmentController.fetchEnrollment);
enrollmentRouter.get('/fetchAll', verifyToken, enrollmentController.fetchEnrollments);