import dotenv from 'dotenv';

dotenv.config();

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use(routes);

class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

// Middleware de rota inexistente
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    response: {
      data: {
        message:
          'Ops! Não conseguimos encontrar o que você está procurando. Entre em contato com o suporte para mais informações.',
      },
    },
  });
});

// Middleware de erro (registrado no nível do `app`, não do `Router`)
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    response: {
      data: {
        message:
          err.message ||
          'Erro interno no servidor. Entre em contato com o suporte para mais informações.',
      },
    },
  });
});

app.listen(process.env.PORT, () =>
  console.log('Server started on: http://localhost:' + process.env.PORT),
);
