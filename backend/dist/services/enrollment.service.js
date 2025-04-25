"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentService = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const inputValidators_1 = require("../validators/inputValidators");
class EnrollmentService {
    prisma = new client_1.PrismaClient({
        log: ['error']
    });
    async createEnrollment(enrollment) {
        const { error } = inputValidators_1.EnrollmentRegistrationSchema.validate(enrollment);
        if (error) {
            return {
                "error": error.details[0].message
            };
        }
        let clientExists = await this.prisma.clients.findFirst({
            where: {
                clientId: enrollment.clientId,
                isDeleted: false
            }
        });
        if (!clientExists) {
            return {
                "error": "The client does not exist or is deleted"
            };
        }
        let programExists = await this.prisma.programs.findUnique({
            where: {
                programId: enrollment.programId
            }
        });
        if (!programExists) {
            return {
                "error": "The program does not exist"
            };
        }
        let { enrollmentId, createdAt, status, Client, Program, ...otherDetails } = enrollment;
        let enrollmentCreated = await this.prisma.enrollments.create({
            data: {
                enrollmentId: (0, uuid_1.v4)(),
                ...otherDetails
            }
        });
        if (enrollmentCreated) {
            return {
                "message": "Enrollment created successfully"
            };
        }
        else {
            return {
                "error": "Failed to create enrollment. Try again later or contact admin"
            };
        }
    }
    async updateEnrollment(enrollment, enrollmentId) {
        const { error } = inputValidators_1.EnrollmentUpdateSchema.validate(enrollment);
        if (error) {
            return {
                "error": error.details[0].message
            };
        }
        let enrollmentExists = await this.prisma.enrollments.findUnique({
            where: {
                enrollmentId
            }
        });
        if (!enrollmentExists) {
            return {
                "error": "The enrollment you are trying to update does not exist"
            };
        }
        let enrollmentUpdated = await this.prisma.enrollments.update({
            where: {
                enrollmentId
            },
            data: {
                status: enrollment.status
            }
        });
        if (enrollmentUpdated) {
            return {
                "message": "Enrollment updated successfully"
            };
        }
        else {
            return {
                "error": "Failed to update enrollment"
            };
        }
    }
    async fetchEnrollment(enrollmentId) {
        let enrollmentFetched = await this.prisma.enrollments.findFirst({
            where: {
                enrollmentId
            },
            include: {
                Client: true,
                Program: true
            }
        });
        if (enrollmentFetched) {
            return {
                "message": "Enrollment fetched successfully",
                "enrollment": enrollmentFetched
            };
        }
        else {
            return {
                "error": "Error in fetching enrollment"
            };
        }
    }
    async fetchEnrollments() {
        let enrollmentsFetched = await this.prisma.enrollments.findMany({
            include: {
                Client: true,
                Program: true
            }
        });
        if (enrollmentsFetched) {
            return {
                "message": "Enrollments fetched successfully",
                "enrollments": enrollmentsFetched
            };
        }
        else {
            return {
                "error": "Error in fetching enrollments"
            };
        }
    }
}
exports.EnrollmentService = EnrollmentService;
