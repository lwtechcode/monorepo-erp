import { Router } from 'express';
import productCategoryController from '../controllers/product-category.controller';
import { requestBodyValidation } from '../middlewares/request-validator';
import { productCategorySchema } from '../schemas/product-category.schema';

const productCategoryRoutes = Router();

productCategoryRoutes.post(
  '/',
  requestBodyValidation(productCategorySchema),
  productCategoryController.create,
);

productCategoryRoutes.get('/', productCategoryController.findAll);

productCategoryRoutes.get('/options', productCategoryController.findAllOptions);

productCategoryRoutes.put(
  '/:id',
  requestBodyValidation(productCategorySchema),
  productCategoryController.update,
);

export default productCategoryRoutes;
