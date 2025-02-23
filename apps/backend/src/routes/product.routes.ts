import { Router } from 'express';

import productController from '../controllers/product.controller';
import { requestBodyValidation } from '../middlewares/request-validator';
import { productSchema } from '../schemas/product.schema';

const productRoutes = Router();

productRoutes.get('/report', productController.generatePDF);

productRoutes.post(
  '/',
  requestBodyValidation(productSchema),
  productController.create,
);

productRoutes.get('/', productController.findAll);

productRoutes.put(
  '/:id',
  requestBodyValidation(productSchema),
  productController.update,
);

export default productRoutes;
