"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientSchema = void 0;
const zod_1 = require("zod");
exports.clientSchema = zod_1.z.object({
    name: zod_1.z.string().min(4).max(255),
    gender: zod_1.z.string().min(1).max(1).optional().nullable(),
    birthDate: zod_1.z.coerce.date().optional().nullable(),
    cpf: zod_1.z.string().min(11).max(11).optional().nullable(),
    rg: zod_1.z.string().max(15).optional().nullable(),
    email: zod_1.z.string().email().optional().nullable(),
    phone: zod_1.z.string().min(11).max(11).optional().nullable(),
    cep: zod_1.z
        .string()
        .regex(/^\d{8}$/)
        .optional()
        .nullable(),
    address: zod_1.z.string().optional().nullable(),
    number: zod_1.z.string().max(5).optional().nullable(),
    neighborhood: zod_1.z.string().max(100).optional().nullable(),
    city: zod_1.z.string().max(100).optional().nullable(),
    state: zod_1.z.string().max(2).optional().nullable(),
    complement: zod_1.z.string().max(255).optional().nullable(),
    observation: zod_1.z.string().optional().nullable(),
    active: zod_1.z.boolean().optional().nullable(),
});
