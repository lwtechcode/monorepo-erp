import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodObject } from 'zod';

export function requestBodyValidation(schema: ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const sanitizeBody = req.body;

      for (const key in sanitizeBody) {
        if (sanitizeBody.hasOwnProperty(key)) {
          if (
            typeof sanitizeBody[key] === 'string' &&
            sanitizeBody[key] === ''
          ) {
            sanitizeBody[key] = null;
          }
        }
      }

      const parsedBody = schema.strip().parse(sanitizeBody);

      req.body = parsedBody;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        return res
          .status(400)
          .json({ message: 'Invalid data', details: errorMessages });
      } else {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  };
}
