import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(4).max(255),
  gender: z.string().min(1).max(1).optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  cpf: z.string().min(11).max(11).optional().nullable(),
  rg: z.string().max(15).optional().nullable(),
  email: z.string().email().optional().nullable(),
  phone: z.string().min(11).max(11).optional().nullable(),
  cep: z
    .string()
    .regex(/^\d{8}$/)
    .optional()
    .nullable(),
  address: z.string().optional().nullable(),
  number: z.string().max(5).optional().nullable(),
  neighborhood: z.string().max(100).optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  state: z.string().max(2).optional().nullable(),
  complement: z.string().max(255).optional().nullable(),
  observation: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
});
