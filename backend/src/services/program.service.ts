import { PrismaClient } from "@prisma/client";
import { Program } from "../interfaces/medic.interface";
import { v4 } from "uuid";
import { ProgramRegistrationSchema, ProgramUpdateSchema } from "../validators/inputValidators";

export class ProgramService {
    prisma = new PrismaClient({
        log: ['error']
    });

    async createProgram(program: Program) {
        const { error } = ProgramRegistrationSchema.validate(program);
        if (error) {
            return {
                "error": error.details[0].message
            };
        }

        let nameExists = await this.prisma.programs.findUnique({
            where: {
                name: program.name
            }
        });

        if (nameExists) {
            return {
                "error": "This program name is already registered"
            };
        }

        let { programId,Enrollments,createdAt, ...otherDetails } = program;

        let programCreated = await this.prisma.programs.create({
            data: {
                programId: v4(),
                ...otherDetails
            }
        });

        if (programCreated) {
            return {
                "message": "Program created successfully"
            };
        } else {
            return {
                "error": "Failed to create program. Try again later or contact admin"
            };
        }
    }

    async updateProgram(program: Program, programId: string) {
        const { error } = ProgramUpdateSchema.validate(program);
        if (error) {
            return {
                "error": error.details[0].message
            };
        }

        let programExists = await this.prisma.programs.findUnique({
            where: {
                programId
            }
        });

        if (!programExists) {
            return {
                "error": "The program you are trying to update does not exist"
            };
        }

        let nameExists = await this.prisma.programs.findUnique({
            where: {
                name: program.name
            }
        });

        if (nameExists && nameExists.programId !== programId) {
            return {
                "error": "This program name is already registered"
            };
        }

        let { programId: id,Enrollments,createdAt, ...otherDetails } = program;

        let programUpdated = await this.prisma.programs.update({
            where: {
                programId
            },
            data: {
                ...otherDetails
            }
        });

        if (programUpdated) {
            return {
                "message": "Program updated successfully"
            };
        } else {
            return {
                "error": "Failed to update program"
            };
        }
    }

    async fetchProgram(programId: string) {
        let programFetched = await this.prisma.programs.findFirst({
            where: {
                programId
            },
            include: {
                Enrollments: true
            }
        });

        if (programFetched) {
            return {
                "message": "Program fetched successfully",
                "program": programFetched
            };
        } else {
            return {
                "error": "Error in fetching program"
            };
        }
    }

    async fetchPrograms() {
        let programsFetched = await this.prisma.programs.findMany({
            include: {
                Enrollments: true
            }
        });

        if (programsFetched) {
            return {
                "message": "Programs fetched successfully",
                "programs": programsFetched
            };
        } else {
            return {
                "error": "Error in fetching programs"
            };
        }
    }
}