import { Router } from 'express';
import unitOfMeasurementController from '../controllers/unit-of-measurement.controller';
import { requestBodyValidation } from '../middlewares/request-validator';
import { unitOfMeasurementSchema } from '../schemas/unit-of-measurement.schema';

const unitOfMeasurementRoutes = Router();

unitOfMeasurementRoutes.post(
  '/',
  requestBodyValidation(unitOfMeasurementSchema),
  unitOfMeasurementController.create,
);

unitOfMeasurementRoutes.get('/', unitOfMeasurementController.findAll);

unitOfMeasurementRoutes.get(
  '/options',
  unitOfMeasurementController.findAllOptions,
);

unitOfMeasurementRoutes.put(
  '/:id',
  requestBodyValidation(unitOfMeasurementSchema),
  unitOfMeasurementController.update,
);

export default unitOfMeasurementRoutes;
