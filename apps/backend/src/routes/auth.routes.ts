import { Router } from 'express';

import authController from '../controllers/auth.controller';
import { requestBodyValidation } from '../middlewares/request-validator';
import { loginSchema, createCompanyDataSchema } from '../schemas/auth.schema';

const authRoutes = Router();

authRoutes.get('/validate-registration/:code', authController.validateCompany);

authRoutes.post(
  '/login',
  requestBodyValidation(loginSchema),
  authController.login,
);

authRoutes.post(
  '/register',
  requestBodyValidation(createCompanyDataSchema),
  authController.registerCompany,
);

export default authRoutes;
