import { Router } from 'express';
import { requestBodyValidation } from '../middlewares/request-validator';
import { paymentMethodSchema } from '../schemas/payment-method.schema';
import paymentMethodController from '../controllers/payment-method.controller';

const paymentMethodsRoutes = Router();

paymentMethodsRoutes.post(
  '/',
  requestBodyValidation(paymentMethodSchema),
  paymentMethodController.create,
);

paymentMethodsRoutes.get('/options', paymentMethodController.findAllOptions);

paymentMethodsRoutes.get('/', paymentMethodController.findAll);

paymentMethodsRoutes.put(
  '/:id',
  requestBodyValidation(paymentMethodSchema),
  paymentMethodController.update,
);

export default paymentMethodsRoutes;
