import { Router } from "express";
import { verifyToken } from "../middlewares/verificationToken";
import { ClientController } from "../controllers/client.controller";

const clientController = new ClientController();

export const clientRouter = Router();

clientRouter.post('/create', verifyToken, clientController.createClient);
clientRouter.put('/update/:clientId', verifyToken, clientController.updateClient);
clientRouter.get('/fetchOne/:clientId', verifyToken, clientController.fetchClient);
clientRouter.get('/fetchAll', verifyToken, clientController.fetchClients);
clientRouter.get('/search', verifyToken, clientController.searchClients);
clientRouter.put('/delete/:clientId', verifyToken, clientController.softDeleteClient);
clientRouter.patch('/restore/:clientId', verifyToken, clientController.restoreDeletedClient);
clientRouter.get('/fetchDeleted', verifyToken, clientController.fetchDeletedClients);