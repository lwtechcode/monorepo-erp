import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const companySchema = z.object({
  name: z.string(),
  cnpj: z.string(),
  phone: z.string(),
  email: z.string().email(),
  street: z.string(),
  number: z.string(),
  complement: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
});

const adminUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const createCompanyDataSchema = z.object({
  company: companySchema,
  adminUser: adminUserSchema,
});

export type CreateCompanyData = z.infer<typeof createCompanyDataSchema>;
