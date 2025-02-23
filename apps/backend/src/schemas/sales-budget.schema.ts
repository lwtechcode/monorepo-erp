import { z } from 'zod';

export const saleBudgetSchema = z.object({
  payment_method_id: z.string().min(1),
  client_id: z.string().optional().nullable(),
  discount_value: z.number().optional().nullable(),
  increase_value: z.number().optional().nullable(),
  products: z
    .array(
      z.object({
        id: z.string().min(1),
        discounted_price: z.number().min(0).nullable(),
        qty: z.number().min(1),
      }),
    )
    .min(0),
});
