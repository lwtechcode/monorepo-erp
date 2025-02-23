import { Router } from 'express';

import supplierController from '../controllers/supplier.controller';

import { requestBodyValidation } from '../middlewares/request-validator';

import { supplierSchema } from '../schemas/supplier.schema';

const supplierRoutes = Router();

supplierRoutes.get('/report', supplierController.generatePDF);

supplierRoutes.get('/options', supplierController.findAllOptions);

supplierRoutes.post(
  '/',
  requestBodyValidation(supplierSchema),
  supplierController.create,
);

supplierRoutes.get('/', supplierController.findAll);

supplierRoutes.put(
  '/:id',
  requestBodyValidation(supplierSchema),
  supplierController.update,
);

export default supplierRoutes;
