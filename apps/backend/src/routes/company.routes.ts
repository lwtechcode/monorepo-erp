import { Router } from "express";

import companyController from "../controllers/company.controller";

const companyRoutes = Router();

companyRoutes.post("/", companyController.create);

export default companyRoutes;
