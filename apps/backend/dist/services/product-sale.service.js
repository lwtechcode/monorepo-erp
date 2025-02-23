"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../database/prisma");
async function create(data) {
    return prisma_1.prisma.productSale.create({
        data: {
            discounted_price: data.discounted_price,
            name: data.name,
            original_price: data.original_price,
            qty: data.qty,
            company_id: data.company_id,
            product_id: data.product_id,
            sale_id: data.sale_id,
        },
    });
}
exports.default = { create };
