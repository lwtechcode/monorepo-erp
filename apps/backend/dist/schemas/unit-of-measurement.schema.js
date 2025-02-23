"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitOfMeasurementSchema = void 0;
const zod_1 = require("zod");
exports.unitOfMeasurementSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
    abbreviation: zod_1.z.string().min(1),
    active: zod_1.z.boolean().optional().nullable(),
});
