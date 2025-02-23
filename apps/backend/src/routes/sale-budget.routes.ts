import { Router } from 'express';
import controller from '../controllers/sale-budget.controller';
import { requestBodyValidation } from '../middlewares/request-validator';
import { saleBudgetSchema } from '../schemas/sales-budget.schema';

const saleBudgetRoutes = Router();

saleBudgetRoutes.post(
  '/',
  requestBodyValidation(saleBudgetSchema),
  controller.create,
);
saleBudgetRoutes.get('/:id', controller.findById);
saleBudgetRoutes.delete('/:id', controller.remove);
saleBudgetRoutes.get('/:id/coupon', controller.generateCoupon);
saleBudgetRoutes.get('/', controller.findAll);

export default saleBudgetRoutes;
