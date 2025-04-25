import { PrismaClient } from "@prisma/client";
import { Doctor } from "../interfaces/medic.interface";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { DoctorRegistrationSchema, DoctorUpdateSchema, DoctorChangePasswordSchema } from "../validators/inputValidators";

export class DoctorService {
    prisma = new PrismaClient({
        log: ['error']
    });

    async createDoctor(doctor: Doctor) {
        const { error } = DoctorRegistrationSchema.validate(doctor);
        if (error) {
            return {
                "error": error.details[0].message
            };
        }

        let emailExists = await this.prisma.doctors.findUnique({
            where: {
                email: doctor.email
            }
        });

        if (emailExists) {
            return {
                "error": "You are already registered. Login instead"
            };
        }

        let hashedPassword = bcrypt.hashSync(doctor.password, 14);
        let { doctorId, password, ...otherDetails } = doctor;

        let doctorCreated = await this.prisma.doctors.create({
            data: {
                doctorId: v4(),
                password: hashedPassword,
                ...otherDetails
            }
        });

        if (doctorCreated) {
            return {
                "message": "Account created successfully"
            };
        } else {
            return {
                "error": "Failed to create account. Try again later or contact admin"
            };
        }
    }

    async updateDoctor(doctor: Doctor, doctorId: string) {
        const { error } = DoctorUpdateSchema.validate(doctor);
        if (error) {
            return {
                "error": error.details[0].message
            };
        }

        let doctorExists = await this.prisma.doctors.findUnique({
            where: {
                doctorId
            }
        });

        if (!doctorExists) {
            return {
                "error": "The account you are trying to update does not exist"
            };
        } else {
            let { doctorId: id, password, ...otherDetails } = doctor;

            let doctorUpdated = await this.prisma.doctors.update({
                where: {
                    doctorId
                },
                data: {
                    ...otherDetails
                }
            });

            if (doctorUpdated) {
                return {
                    "message": "Account updated successfully"
                };
            } else {
                return {
                "error": "Failed to update account"
                };
            }
        }
    }

    async fetchDoctor(doctorId: string) {
        let doctorFetched = await this.prisma.doctors.findFirst({
            where: {
                doctorId
            }
        });

        if (doctorFetched) {
            return {
                "message": "Doctor fetched successfully",
                "doctor": doctorFetched
            };
        } else {
            return {
                "error": "Error in fetching doctor"
            };
        }
    }

    async fetchDoctors() {
        let doctorsFetched = await this.prisma.doctors.findMany({});

        if (doctorsFetched) {
            return {
                "message": "Doctors fetched successfully",
                "doctors": doctorsFetched
            };
        } else {
            return {
                "error": "Error in fetching doctors"
            };
        }
    }

    async changePassword(doctorId: string, oldPassword: string, newPassword: string) {
        const { error } = DoctorChangePasswordSchema.validate({ oldPassword, newPassword });
        if (error) {
            return {
                "error": error.details[0].message
            };
        }

        let doctorExists = await this.prisma.doctors.findUnique({
            where: {
                doctorId
            }
        });

        if (!doctorExists) {
            return {
                "error": "The account does not exist"
            };
        }

        let isPasswordValid = bcrypt.compareSync(oldPassword, doctorExists.password);

        if (!isPasswordValid) {
            return {
                "error": "Invalid current password"
            };
        }

        let hashedNewPassword = bcrypt.hashSync(newPassword, 14);

        let doctorUpdated = await this.prisma.doctors.update({
            where: {
                doctorId
            },
            data: {
                password: hashedNewPassword
            }
        });

        if (doctorUpdated) {
            return {
                "message": "Password changed successfully"
            };
        } else {
            return {
                "error": "Failed to change password"
            };
        }
    }
}