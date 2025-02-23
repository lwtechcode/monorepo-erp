import { Router } from 'express';

const authRoutes = Router();

authRoutes.get('/', (_, response) =>
  response.json({ message: 'Server is Running! ✅' }),
);

export default authRoutes;
