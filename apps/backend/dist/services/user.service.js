"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../database/prisma");
async function create(data) {
    return prisma_1.prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            password: data.password,
            company_id: data.company_id,
            active: data.active,
            phone: data.phone,
        },
    });
}
async function findById({ id, company_id, }) {
    return prisma_1.prisma.user.findUnique({ where: { id, company_id: company_id } });
}
async function findByEmail({ email, company_id, }) {
    return prisma_1.prisma.user.findFirst({ where: { email, company_id } });
}
exports.default = { create, findByEmail, findById };
