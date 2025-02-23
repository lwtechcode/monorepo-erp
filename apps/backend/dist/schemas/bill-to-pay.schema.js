"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billToPayUpdateSchema = exports.billToPaySchema = void 0;
const zod_1 = require("zod");
exports.billToPaySchema = zod_1.z.object({
    description: zod_1.z.string().min(1).max(255),
    due_date: zod_1.z.coerce.date(),
    pay_date: zod_1.z.coerce.date().optional().nullable(),
    value: zod_1.z.number(),
    // status: z.number().optional().nullable(),
    creditor: zod_1.z.string().optional().nullable(),
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
    observation: zod_1.z.string().optional().nullable(),
    // added_value: z.number().optional().nullable(),
});
exports.billToPayUpdateSchema = zod_1.z.object({
    description: zod_1.z.string().min(1).max(255),
    due_date: zod_1.z.coerce.date(),
    pay_date: zod_1.z.coerce.date().optional().nullable(),
    value: zod_1.z.number(),
    status: zod_1.z.number().optional().nullable(),
    payment_method: zod_1.z.number().optional().nullable(),
    observation: zod_1.z.string().optional().nullable(),
    added_value: zod_1.z.number().optional().nullable(),
    creditor: zod_1.z.string().optional().nullable(),
});
