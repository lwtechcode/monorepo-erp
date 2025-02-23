import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(3),
  company_name: z.string().min(1),
  cnpj: z
    .string()
    .optional()
    .refine(
      (value) => {
        return !value || /^\d{14}$/.test(value);
      },
      {
        message: 'O CNPJ deve conter exatamente 14 dígitos.',
      },
    ),
});
