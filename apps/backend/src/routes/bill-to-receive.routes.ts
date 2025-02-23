import { Router } from "express";

import { requestBodyValidation } from "../middlewares/request-validator";

import billToReceiveController from "../controllers/bill-to-receive.controller";

import { billToReceiveSchema } from "../schemas/bill-to-receive.schema";

const billToReceiveRoutes = Router();

billToReceiveRoutes.get("/report", billToReceiveController.generatePDF);

billToReceiveRoutes.get("/", billToReceiveController.findAll);

billToReceiveRoutes.post(
  "/",
  requestBodyValidation(billToReceiveSchema),
  billToReceiveController.create
);

billToReceiveRoutes.put(
  "/:id",
  requestBodyValidation(billToReceiveSchema),
  billToReceiveController.update
);

billToReceiveRoutes.delete("/:id", billToReceiveController.remove);

export default billToReceiveRoutes;
