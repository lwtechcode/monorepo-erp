import { Router } from "express";

import clientController from "../controllers/client.controller";
import { requestBodyValidation } from "../middlewares/request-validator";
import { clientSchema } from "../schemas/client.schema";

const clientRoutes = Router();

clientRoutes.get("/report", clientController.generatePDF);


clientRoutes.post(
  "/",
  requestBodyValidation(clientSchema),
  clientController.create
);

clientRoutes.get('/options', clientController.findAllOptions);

clientRoutes.get("/", clientController.findAll);

clientRoutes.put(
  "/:id",
  requestBodyValidation(clientSchema),
  clientController.update
);

export default clientRoutes;
