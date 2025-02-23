import { z } from 'zod';

export const billToPaySchema = z.object({
  description: z.string().min(1).max(255),
  due_date: z.coerce.date(),
  pay_date: z.coerce.date().optional().nullable(),
  value: z.number(),
  // status: z.number().optional().nullable(),
  creditor: z.string().optional().nullable(),
  // recurrence: z.boolean().optional().nullable(),
  // number_of_installments: z
  //   .number()
  //   .optional()
  //   .refine((val) => val !== undefined, {
  //     message:
  //       "número de parcelas é obrigatória quando a recorrencia for verdadeira",
  //     path: ["number_of_installments"],
  //   })
  //   .nullable(),
  observation: z.string().optional().nullable(),
  // added_value: z.number().optional().nullable(),
});

export const billToPayUpdateSchema = z.object({
  description: z.string().min(1).max(255),
  due_date: z.coerce.date(),
  pay_date: z.coerce.date().optional().nullable(),
  value: z.number(),
  status: z.number().optional().nullable(),
  payment_method: z.number().optional().nullable(),
  observation: z.string().optional().nullable(),
  added_value: z.number().optional().nullable(),
  creditor: z.string().optional().nullable(),
});
