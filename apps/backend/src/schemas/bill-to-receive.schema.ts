import { z } from "zod";

export const billToReceiveSchema = z.object({
  description: z.string().min(1).max(255),
  due_date: z.coerce.date(),
  receipt_date: z.coerce.date().optional().nullable(),
  value: z.number(),
  client_id: z.string().optional().nullable(),
  observation: z.string().optional().nullable(),
});
