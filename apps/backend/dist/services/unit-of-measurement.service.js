"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../database/prisma");
async function create(data) {
    return await prisma_1.prisma.unitOfMeasurement.create({
        data: {
            name: data.name,
            abbreviation: data.abbreviation,
            company_id: data.company_id,
        },
    });
}
async function findById({ id, companyId }) {
    const where = { id, company_id: companyId };
    return await prisma_1.prisma.unitOfMeasurement.findUnique({
        where,
    });
}
async function findAll({ page, pageSize, companyId, nameOrAbbreviation, }) {
    const where = {
        OR: [
            { name: { contains: nameOrAbbreviation } },
            { abbreviation: { contains: nameOrAbbreviation } },
        ],
    };
    if (companyId) {
        Object.assign(where, { company_id: companyId });
    }
    const totalCount = await prisma_1.prisma.unitOfMeasurement.count({ where });
    const totalPages = Math.ceil(totalCount / pageSize);
    const skip = (page - 1) * pageSize;
    const unitsMeasurements = await prisma_1.prisma.unitOfMeasurement.findMany({
        where,
        skip,
        take: pageSize,
    });
    return {
        unitsMeasurements,
        totalCount,
        totalPages,
    };
}
async function update({ companyId, data, unitOfMeasurementId }) {
    const updateData = Object.entries(data)
        .filter(([_, value]) => value !== undefined)
        .reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
    return prisma_1.prisma.unitOfMeasurement.update({
        where: { id: unitOfMeasurementId, company_id: companyId },
        data: updateData,
    });
}
async function findAllOptions(companyId) {
    const units = await prisma_1.prisma.unitOfMeasurement.findMany({
        where: { company_id: companyId },
    });
    return units.map((unit) => ({
        value: unit.id,
        label: unit.abbreviation,
    }));
}
exports.default = {
    create,
    findAll,
    update,
    findById,
    findAllOptions,
};
