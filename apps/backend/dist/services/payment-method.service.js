"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = findAll;
const prisma_1 = require("../database/prisma");
async function create(data) {
    return await prisma_1.prisma.paymentMethod.create({
        data: {
            name: data.name,
            tax: data.tax,
            observation: data.observation,
            company_id: data.company_id,
        },
    });
}
async function findById({ id, companyId }) {
    const where = { id, company_id: companyId };
    const clients = await prisma_1.prisma.paymentMethod.findUnique({
        where,
    });
    return clients;
}
async function findAll({ page, pageSize, companyId, name }) {
    const where = {
        OR: [{ name: { contains: name } }],
    };
    if (companyId) {
        Object.assign(where, { company_id: companyId });
    }
    const totalCount = await prisma_1.prisma.paymentMethod.count({ where });
    const totalPages = Math.ceil(totalCount / pageSize);
    const skip = (page - 1) * pageSize;
    const paymentMethods = await prisma_1.prisma.paymentMethod.findMany({
        where,
        skip,
        take: pageSize,
    });
    return {
        paymentMethods,
        totalCount,
        totalPages,
    };
}
async function update({ companyId, data, paymentId }) {
    const updateData = Object.entries(data)
        .filter(([_, value]) => value !== undefined)
        .reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
    return prisma_1.prisma.paymentMethod.update({
        where: { id: paymentId, company_id: companyId },
        data: updateData,
    });
}
async function findAllOptions(companyId) {
    const paymentMethods = await prisma_1.prisma.paymentMethod.findMany({
        where: { company_id: companyId },
    });
    return paymentMethods.map((method) => ({
        value: method.id,
        label: method.name,
        tax: method.tax,
    }));
}
exports.default = { create, findById, findAll, update, findAllOptions };
