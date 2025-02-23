import { Router } from 'express';
import saleController from '../controllers/sale.controller';
import { requestBodyValidation } from '../middlewares/request-validator';
import { saleSchema } from '../schemas/sales.schema';

const saleRoutes = Router();

saleRoutes.get('/', saleController.findAll);
saleRoutes.post('/', requestBodyValidation(saleSchema), saleController.create);
saleRoutes.get('/:id', saleController.findById);
saleRoutes.get('/:id/coupon', saleController.generateCoupon);

export default saleRoutes;
