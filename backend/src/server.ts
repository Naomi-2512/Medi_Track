import express, { json, NextFunction, Request, Response } from "express";
import cors from 'cors';
import { authRouter } from "./routes/auth.route";
import { doctorRouter } from "./routes/doctor.route";
import { clientRouter } from "./routes/client.route";
import { programRouter } from "./routes/program.route";
import { enrollmentRouter } from "./routes/enrollment.route";

const app = express();

app.use(json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/doctors", doctorRouter);
app.use("/clients", clientRouter);
app.use("/programs", programRouter);
app.use("/enrollments", enrollmentRouter);

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    res.json({
        message: err.message
    });
});

app.listen(3000, () => {
    console.log('server is listening on port 3000');
});