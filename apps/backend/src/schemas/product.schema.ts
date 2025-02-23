import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(4).max(255),
  sku: z.string().nullable().optional(),
  bar_code: z.string().nullable().optional(),
  manufacturer: z.string().nullable().optional(),
  product_origin: z.string().min(1).max(1).nullable().optional(),
  cost_price: z.number().max(9999999),
  sale_price: z.number().max(9999999),
  stock: z.number().max(9999999).nullable().optional(),
  description: z.string().nullable().optional(),
  observation: z.string().nullable().optional(),
  location_in_store: z.string().nullable().optional(),
  supplier_id: z.string().nullable().optional(),
  product_category_id: z.string().optional().nullable(),
  active: z.boolean().optional().nullable().optional(),
  model: z.string().optional().nullable().optional(),
  discount: z.number().optional().nullable().optional(),
});
