import { Router } from 'express';

import authController from '../controllers/auth.controller';
import { requestBodyValidation } from '../middlewares/request-validator';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const authRoutes = Router();

authRoutes.post(
  '/login',
  requestBodyValidation(loginSchema),
  authController.login,
);

authRoutes.post(
  '/register',
  requestBodyValidation(registerSchema),
  authController.register,
);

export default authRoutes;
