"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const inputValidators_1 = require("../validators/inputValidators");
class DoctorService {
    prisma = new client_1.PrismaClient({
        log: ['error']
    });
    async createDoctor(doctor) {
        const { error } = inputValidators_1.DoctorRegistrationSchema.validate(doctor);
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
        let hashedPassword = bcrypt_1.default.hashSync(doctor.password, 14);
        let { doctorId, password, ...otherDetails } = doctor;
        let doctorCreated = await this.prisma.doctors.create({
            data: {
                doctorId: (0, uuid_1.v4)(),
                password: hashedPassword,
                ...otherDetails
            }
        });
        if (doctorCreated) {
            return {
                "message": "Account created successfully"
            };
        }
        else {
            return {
                "error": "Failed to create account. Try again later or contact admin"
            };
        }
    }
    async updateDoctor(doctor, doctorId) {
        const { error } = inputValidators_1.DoctorUpdateSchema.validate(doctor);
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
        }
        else {
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
            }
            else {
                return {
                    "error": "Failed to update account"
                };
            }
        }
    }
    async fetchDoctor(doctorId) {
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
        }
        else {
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
        }
        else {
            return {
                "error": "Error in fetching doctors"
            };
        }
    }
    async changePassword(doctorId, oldPassword, newPassword) {
        const { error } = inputValidators_1.DoctorChangePasswordSchema.validate({ oldPassword, newPassword });
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
        let isPasswordValid = bcrypt_1.default.compareSync(oldPassword, doctorExists.password);
        if (!isPasswordValid) {
            return {
                "error": "Invalid current password"
            };
        }
        let hashedNewPassword = bcrypt_1.default.hashSync(newPassword, 14);
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
        }
        else {
            return {
                "error": "Failed to change password"
            };
        }
    }
}
exports.DoctorService = DoctorService;
