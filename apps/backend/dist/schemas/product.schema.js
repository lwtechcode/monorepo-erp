"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    name: zod_1.z.string().min(4).max(255),
    sku: zod_1.z.string().nullable().optional(),
    bar_code: zod_1.z.string().nullable().optional(),
    manufacturer: zod_1.z.string().nullable().optional(),
    product_origin: zod_1.z.string().min(1).max(1).nullable().optional(),
    cost_price: zod_1.z.number().max(9999999),
    sale_price: zod_1.z.number().max(9999999),
    stock: zod_1.z.number().max(9999999).nullable().optional(),
    description: zod_1.z.string().nullable().optional(),
    observation: zod_1.z.string().nullable().optional(),
    location_in_store: zod_1.z.string().nullable().optional(),
    supplier_id: zod_1.z.string().nullable().optional(),
    product_category_id: zod_1.z.string().optional().nullable(),
    active: zod_1.z.boolean().optional().nullable().optional(),
    model: zod_1.z.string().optional().nullable().optional(),
    discount: zod_1.z.number().optional().nullable().optional(),
});
