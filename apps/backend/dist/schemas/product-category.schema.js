"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCategorySchema = void 0;
const zod_1 = require("zod");
exports.productCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
});
