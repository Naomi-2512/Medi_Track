import { PrismaClient } from "@prisma/client";
import { LoginDetails, TokenDetails } from "../interfaces/medic.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DoctorLoginSchema } from "../validators/inputValidators";

export class AuthService {
    prisma = new PrismaClient({
        log: ['error']
    });

    async loginDoctor(logins: LoginDetails) {
        const { error } = DoctorLoginSchema.validate(logins);
        if (error) {
            return {
                "error": error.details[0].message
            };
        }

        let doctorExists = await this.prisma.doctors.findUnique({
            where: {
                email: logins.email
            }
        });

        if (!doctorExists) {
            return {
                "error": "Email not found. Sign up instead."
            };
        }

        let passwordCorrect = bcrypt.compareSync(logins.password, doctorExists.password);

        if (!passwordCorrect) {
            return {
                "error": "Incorrect password."
            };
        }

        let token = jwt.sign({ doctorId: doctorExists.doctorId, email: doctorExists.email }, process.env.SECRET_KEY as string, {
            expiresIn: '15m'
        });

        return {
            "message": "Welcome back. Login successful.",
            "token": token
        };
    }
}