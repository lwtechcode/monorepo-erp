import { Router } from "express";

import userController from "../controllers/user.controller";
import { requestBodyValidation } from "../middlewares/request-validator";
import { userSchema } from "../schemas/user.schema";

const userRoutes = Router();

userRoutes.post("/", requestBodyValidation(userSchema), userController.create);

export default userRoutes;
