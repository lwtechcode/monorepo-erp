"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../database/prisma");
async function create(data) {
    return prisma_1.prisma.company.create({
        data: {
            name: data.name,
            active: data.active,
        },
    });
}
async function findById(id) {
    return prisma_1.prisma.company.findUnique({ where: { id } });
}
exports.default = { create, findById };
