import { NextFunction, Request, Response } from 'express';
import jwtUtils from '../utils/jtw.util';

export default function jwtVerify(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers?.authorization?.split(' ')[1];

  if (!authToken) {
    return response.status(401).json({ message: 'Usuário não autorizado' });
  }

  const isValidToken = jwtUtils.checkAssignToken(authToken);

  if (!isValidToken) {
    return response.status(401).json({ message: 'Usuário não autorizado' });
  }

  request.company_id = isValidToken.company_id;

  next();
}
