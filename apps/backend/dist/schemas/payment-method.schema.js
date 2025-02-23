"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMethodSchema = void 0;
const zod_1 = require("zod");
exports.paymentMethodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
    tax: zod_1.z.number().optional().nullable(),
    observation: zod_1.z.string().optional().nullable(),
});
