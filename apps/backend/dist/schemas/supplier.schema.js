"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierSchema = void 0;
const zod_1 = require("zod");
exports.supplierSchema = zod_1.z.object({
    name: zod_1.z.string().min(4).max(255),
    cnpj: zod_1.z.string().min(14).max(14).nullable(),
    email: zod_1.z.string().email().nullable(),
    phone: zod_1.z.string().min(11).max(11).nullable(),
    cep: zod_1.z
        .string()
        .regex(/^\d{8}$/)
        .nullable(),
    address: zod_1.z.string().nullable(),
    number: zod_1.z.string().max(5).nullable(),
    neighborhood: zod_1.z.string().max(100).nullable(),
    city: zod_1.z.string().max(100).nullable(),
    state: zod_1.z.string().max(2).nullable(),
    complement: zod_1.z.string().max(255).nullable(),
    observation: zod_1.z.string().nullable(),
    active: zod_1.z.boolean().optional().nullable(),
});
