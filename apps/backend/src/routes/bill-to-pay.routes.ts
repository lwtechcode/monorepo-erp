import { Router } from "express";

import { requestBodyValidation } from "../middlewares/request-validator";

import billToPayController from "../controllers/bill-to-pay.controller";

import {
  billToPaySchema,
  billToPayUpdateSchema,
} from "../schemas/bill-to-pay.schema";

const billToPayRoutes = Router();

billToPayRoutes.get("/report", billToPayController.generatePDF);

billToPayRoutes.get("/", billToPayController.findAll);

billToPayRoutes.post(
  "/",
  requestBodyValidation(billToPaySchema),
  billToPayController.create
);

billToPayRoutes.put(
  "/:id",
  requestBodyValidation(billToPayUpdateSchema),
  billToPayController.update
);

billToPayRoutes.delete("/:id", billToPayController.remove);

export default billToPayRoutes;
