import { Router } from 'express';

import dashboardController from '../controllers/dashboard.controller';

const dashboardRoutes = Router();

dashboardRoutes.get('/', dashboardController.dashboard);

export default dashboardRoutes;
