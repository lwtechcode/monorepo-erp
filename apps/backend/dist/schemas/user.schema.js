"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(3).max(10),
    phone: zod_1.z.string().optional().nullable(),
    // company_id: z.string().min(1).max(100),
    active: zod_1.z.boolean().optional(),
});
