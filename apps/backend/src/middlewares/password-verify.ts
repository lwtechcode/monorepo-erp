import { NextFunction, Request, Response } from "express";

export default function passwordVerify(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authPassword = request.headers?.authorization;

  if (!authPassword) {
    return response.status(401).json({ message: "Usuário não autorizado" });
  }

  const isValidPassword = authPassword === "qP3gG6sR";

  if (!isValidPassword) {
    return response.status(401).json({ message: "Usuário não autorizado" });
  }

  next();
}
