import { Request, Response } from "express";
import { ClientService } from "../services/client.service";

const clientService = new ClientService();

export class ClientController {
    async createClient(req: Request, res: Response) {
        try {
            let result = await clientService.createClient(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async updateClient(req: Request, res: Response) {
        try {
            let result = await clientService.updateClient(req.body, req.params.clientId);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async fetchClient(req: Request, res: Response) {
        try {
            let result = await clientService.fetchClient(req.params.clientId);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async fetchClients(res: Response) {
        try {
            let result = await clientService.fetchClients();
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async searchClients(req: Request, res: Response) {
        try {
            let result = await clientService.searchClients(req.query.query as string);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async softDeleteClient(req: Request, res: Response) {
        try {
            let result = await clientService.softDeleteClient(req.params.clientId);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async restoreDeletedClient(req: Request, res: Response) {
        try {
            let result = await clientService.restoreDeletedClient(req.params.clientId);
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }

    async fetchDeletedClients(res: Response) {
        try {
            let result = await clientService.fetchDeletedClients();
            res.status(201).json(result);
        } catch (error) {
            res.status(501).json({
                'error': error
            });
        }
    }
}