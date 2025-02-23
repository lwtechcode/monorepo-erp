"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    phone: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(3),
    company_name: zod_1.z.string().min(1),
    cnpj: zod_1.z
        .string()
        .optional()
        .refine((value) => {
        return !value || /^\d{14}$/.test(value);
    }, {
        message: 'O CNPJ deve conter exatamente 14 dígitos.',
    }),
});
