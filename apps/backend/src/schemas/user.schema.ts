import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(3).max(10),
  phone: z.string().optional().nullable(),
  // company_id: z.string().min(1).max(100),
  active: z.boolean().optional(),
});
