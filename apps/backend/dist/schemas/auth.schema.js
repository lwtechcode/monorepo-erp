"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompanyDataSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const companySchema = zod_1.z.object({
    name: zod_1.z.string(),
    cnpj: zod_1.z.string(),
    phone: zod_1.z.string(),
    email: zod_1.z.string().email(),
    street: zod_1.z.string(),
    number: zod_1.z.string(),
    complement: zod_1.z.string(),
    neighborhood: zod_1.z.string(),
    city: zod_1.z.string(),
    state: zod_1.z.string(),
    zipCode: zod_1.z.string(),
});
const adminUserSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.createCompanyDataSchema = zod_1.z.object({
    company: companySchema,
    adminUser: adminUserSchema,
});
