"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const inputValidators_1 = require("../validators/inputValidators");
class ClientService {
    prisma = new client_1.PrismaClient({
        log: ['error']
    });
    async createClient(client) {
        const { error } = inputValidators_1.ClientRegistrationSchema.validate(client);
        if (error) {
            return {
                "error": error.message
            };
        }
        let emailExists = await this.prisma.clients.findUnique({
            where: {
                email: client.email
            }
        });
        if (emailExists) {
            if (emailExists.isDeleted === true) {
                return {
                    "error": "This email is associated with a deleted account. Use a new email or contact admin"
                };
            }
            else {
                return {
                    "error": "This email is already registered"
                };
            }
        }
        let phoneExists = await this.prisma.clients.findFirst({
            where: {
                phone: client.phone
            }
        });
        if (phoneExists) {
            if (phoneExists.isDeleted === true) {
                return {
                    "error": "This phone number is associated with a deleted account. Use a new number or contact admin"
                };
            }
            else {
                return {
                    "error": "This phone number is already registered"
                };
            }
        }
        let clientCreated = await this.prisma.clients.create({
            data: {
                clientId: (0, uuid_1.v4)(),
                ...client,
                dateOfBirth: new Date(client.dateOfBirth),
            }
        });
        if (clientCreated) {
            return {
                "message": "Client created successfully"
            };
        }
        else {
            return {
                "error": "Failed to create client. Try again later or contact admin"
            };
        }
    }
    async updateClient(client, clientId) {
        const { error } = inputValidators_1.ClientUpdateSchema.validate(client);
        if (error) {
            return {
                "error": error.details[0].message
            };
        }
        let clientExists = await this.prisma.clients.findUnique({
            where: {
                clientId
            }
        });
        if (!clientExists) {
            return {
                "error": "The client you are trying to update does not exist"
            };
        }
        let emailExists = await this.prisma.clients.findUnique({
            where: {
                email: client.email
            }
        });
        if (emailExists && emailExists.clientId !== clientId) {
            return {
                "error": "This email is already registered"
            };
        }
        let phoneExists = await this.prisma.clients.findFirst({
            where: {
                phone: client.phone
            }
        });
        if (phoneExists && phoneExists.clientId !== clientId) {
            return {
                "error": "This phone number is already registered"
            };
        }
        let { clientId: id, isDeleted, isWelcomed, Enrollments, createdAt, ...otherDetails } = client;
        let clientUpdated = await this.prisma.clients.update({
            where: {
                clientId
            },
            data: {
                ...otherDetails,
                dateOfBirth: new Date(client.dateOfBirth),
            }
        });
        if (clientUpdated) {
            return {
                "message": "Client updated successfully"
            };
        }
        else {
            return {
                "error": "Failed to update client"
            };
        }
    }
    async fetchClient(clientId) {
        let clientFetched = await this.prisma.clients.findFirst({
            where: {
                clientId,
                isDeleted: false
            },
            include: {
                Enrollments: true
            }
        });
        if (clientFetched) {
            return {
                "message": "Client fetched successfully",
                "client": clientFetched
            };
        }
        else {
            return {
                "error": "Error in fetching client"
            };
        }
    }
    async fetchClients() {
        let clientsFetched = await this.prisma.clients.findMany({
            where: {
                isDeleted: false
            },
            include: {
                Enrollments: true
            }
        });
        if (clientsFetched) {
            return {
                "message": "Clients fetched successfully",
                "clients": clientsFetched
            };
        }
        else {
            return {
                "error": "Error in fetching clients"
            };
        }
    }
    async softDeleteClient(clientId) {
        const { error } = inputValidators_1.ClientSoftDeleteSchema.validate({ clientId });
        if (error) {
            return {
                "error": error.details[0].message
            };
        }
        let clientExists = await this.prisma.clients.findUnique({
            where: {
                clientId
            }
        });
        if (!clientExists) {
            return {
                "error": "The client you are trying to delete does not exist"
            };
        }
        else if (clientExists.isDeleted) {
            return {
                "error": "The client is already deleted"
            };
        }
        let clientUpdated = await this.prisma.clients.update({
            where: {
                clientId
            },
            data: {
                isDeleted: true
            }
        });
        if (clientUpdated) {
            return {
                "message": "Client soft deleted successfully"
            };
        }
        else {
            return {
                "error": "Failed to soft delete client"
            };
        }
    }
    async restoreDeletedClient(clientId) {
        const { error } = inputValidators_1.ClientSoftDeleteSchema.validate({ clientId });
        if (error) {
            return {
                "error": error.details[0].message
            };
        }
        let clientExists = await this.prisma.clients.findFirst({
            where: {
                clientId,
                isDeleted: true
            }
        });
        if (!clientExists) {
            return {
                "error": "The client is not deleted or does not exist"
            };
        }
        let clientRestored = await this.prisma.clients.update({
            where: {
                clientId
            },
            data: {
                isDeleted: false
            }
        });
        if (clientRestored) {
            return {
                "message": "Client restored successfully"
            };
        }
        else {
            return {
                "error": "Failed to restore client"
            };
        }
    }
    async fetchDeletedClients() {
        let deletedClientsFetched = await this.prisma.clients.findMany({
            where: {
                isDeleted: true
            },
            include: {
                Enrollments: true
            }
        });
        if (deletedClientsFetched) {
            return {
                "message": "Deleted clients fetched successfully",
                "clients": deletedClientsFetched
            };
        }
        else {
            return {
                "error": "Error in fetching deleted clients"
            };
        }
    }
    async searchClients(query) {
        const { error } = inputValidators_1.ClientSearchSchema.validate({ query });
        if (error) {
            return {
                "error": error.details[0].message
            };
        }
        let clientsFetched = await this.prisma.clients.findMany({
            where: {
                OR: [
                    { firstName: { contains: query } },
                    { lastName: { contains: query } },
                ],
                isDeleted: false
            },
            include: {
                Enrollments: true
            }
        });
        if (clientsFetched) {
            return {
                "message": "Clients fetched successfully",
                "clients": clientsFetched
            };
        }
        else {
            return {
                "error": "Error in fetching clients"
            };
        }
    }
}
exports.ClientService = ClientService;
