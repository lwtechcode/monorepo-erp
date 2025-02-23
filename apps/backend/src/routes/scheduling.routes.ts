import { Router } from "express";
import billToPayController from "../controllers/bill-to-pay.controller";
import billToReceiveController from "../controllers/bill-to-receive.controller";

const schedulingRoutes = Router();

schedulingRoutes.get(
  "/cronjob-change-status-bill-to-pay",
  billToPayController.changeStatus
);

schedulingRoutes.get(
  "/cronjob-change-status-bill-to-receive",
  billToReceiveController.changeStatus
);

export default schedulingRoutes;
