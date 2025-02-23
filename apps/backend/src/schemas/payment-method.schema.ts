import { z } from "zod";

export const paymentMethodSchema = z.object({
  name: z.string().min(1).max(255),
  tax: z.number().optional().nullable(),
  observation: z.string().optional().nullable(),
});
