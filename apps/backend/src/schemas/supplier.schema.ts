import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(4).max(255),
  cnpj: z.string().min(14).max(14).nullable(),
  email: z.string().email().nullable(),
  phone: z.string().min(11).max(11).nullable(),
  cep: z
    .string()
    .regex(/^\d{8}$/)
    .nullable(),
  address: z.string().nullable(),
  number: z.string().max(5).nullable(),
  neighborhood: z.string().max(100).nullable(),
  city: z.string().max(100).nullable(),
  state: z.string().max(2).nullable(),
  complement: z.string().max(255).nullable(),
  observation: z.string().nullable(),
  active: z.boolean().optional().nullable(),
});
