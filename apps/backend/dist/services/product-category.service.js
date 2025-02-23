"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = findAll;
const prisma_1 = require("../database/prisma");
async function create(data) {
    var _a;
    return prisma_1.prisma.productCategory.create({
        data: {
            name: data.name,
            active: (_a = data === null || data === void 0 ? void 0 : data.active) !== null && _a !== void 0 ? _a : true,
            company_id: data.company_id,
        },
    });
}
async function findById({ id, companyId }) {
    const where = { id, company_id: companyId };
    return await prisma_1.prisma.productCategory.findUnique({
        where,
    });
}
async function findAll({ page, pageSize, companyId, name }) {
    const where = {
        OR: [{ name: { contains: name } }],
    };
    if (companyId) {
        Object.assign(where, { company_id: companyId });
    }
    const totalCount = await prisma_1.prisma.productCategory.count({ where });
    const totalPages = Math.ceil(totalCount / pageSize);
    const skip = (page - 1) * pageSize;
    const productCategories = await prisma_1.prisma.productCategory.findMany({
        where,
        skip,
        take: pageSize,
    });
    return {
        productCategories,
        totalCount,
        totalPages,
    };
}
async function update({ companyId, data, paymentId }) {
    const updateData = Object.entries(data)
        .filter(([_, value]) => value !== undefined)
        .reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
    return prisma_1.prisma.productCategory.update({
        where: { id: paymentId, company_id: companyId },
        data: updateData,
    });
}
async function findAllOptions(companyId) {
    const categories = await prisma_1.prisma.productCategory.findMany({
        where: { company_id: companyId },
    });
    return categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));
}
exports.default = { create, findById, findAll, update, findAllOptions };
