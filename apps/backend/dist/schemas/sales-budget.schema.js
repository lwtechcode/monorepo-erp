"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleBudgetSchema = void 0;
const zod_1 = require("zod");
exports.saleBudgetSchema = zod_1.z.object({
    payment_method_id: zod_1.z.string().min(1),
    client_id: zod_1.z.string().optional().nullable(),
    discount_value: zod_1.z.number().optional().nullable(),
    increase_value: zod_1.z.number().optional().nullable(),
    products: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.string().min(1),
        discounted_price: zod_1.z.number().min(0).nullable(),
        qty: zod_1.z.number().min(1),
    }))
        .min(0),
});
