"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billToReceiveSchema = void 0;
const zod_1 = require("zod");
exports.billToReceiveSchema = zod_1.z.object({
    description: zod_1.z.string().min(1).max(255),
    due_date: zod_1.z.coerce.date(),
    receipt_date: zod_1.z.coerce.date().optional().nullable(),
    value: zod_1.z.number(),
    client_id: zod_1.z.string().optional().nullable(),
    observation: zod_1.z.string().optional().nullable(),
});
