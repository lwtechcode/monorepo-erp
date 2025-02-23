"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = update;
const pdfmake_1 = __importDefault(require("pdfmake"));
const prisma_1 = require("../database/prisma");
const date_util_1 = require("../utils/date.util");
async function create(data) {
    return prisma_1.prisma.supplier.create({
        data: {
            cnpj: data.cnpj,
            name: data.name,
            active: data === null || data === void 0 ? void 0 : data.active,
            address: data.address,
            cep: data.cep,
            city: data.city,
            complement: data.complement,
            email: data.email,
            neighborhood: data.neighborhood,
            number: data.number,
            observation: data.observation,
            phone: data.phone,
            state: data.state,
            company_id: data.company_id,
        },
    });
}
async function findById({ id, companyId }) {
    return prisma_1.prisma.supplier.findUnique({ where: { id, company_id: companyId } });
}
async function findAll({ page, pageSize, companyId, nameOrCNPJ, status, orderBy, }) {
    const where = {
        OR: [
            { name: { contains: nameOrCNPJ } },
            { cnpj: { contains: nameOrCNPJ } },
        ],
    };
    if (status) {
        where.active = status === 'ativo';
    }
    if (companyId) {
        Object.assign(where, { company_id: companyId });
    }
    let orderByOption = {};
    if (orderBy === 'name') {
        orderByOption.name = 'asc';
    }
    else if (orderBy === 'createdAt') {
        orderByOption.created_at = 'desc';
    }
    const totalCount = await prisma_1.prisma.supplier.count({ where });
    const totalPages = Math.ceil(totalCount / pageSize);
    const skip = (page - 1) * pageSize;
    const suppliers = await prisma_1.prisma.supplier.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: orderByOption,
    });
    return {
        suppliers,
        totalCount,
        totalPages,
    };
}
async function update(supplierId, data, companyId) {
    const updateData = Object.entries(data)
        .filter(([_, value]) => value !== undefined)
        .reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
    return prisma_1.prisma.supplier.update({
        where: { id: supplierId, company_id: companyId },
        data: updateData,
    });
}
async function findAllOptions(companyId) {
    const suppliers = await prisma_1.prisma.supplier.findMany({
        where: { company_id: companyId },
    });
    return suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
    }));
}
async function findAllToReport({ companyId, nameOrCnpj, status, orderBy, }) {
    const where = {
        company_id: companyId,
    };
    if (status) {
        where.active = status === 'ativo';
    }
    if (nameOrCnpj) {
        where.OR = [
            { name: { contains: nameOrCnpj, mode: 'insensitive' } },
            { cnpj: { contains: nameOrCnpj.replace(/[.-]/g, '') } },
        ];
    }
    let orderByOption = {};
    if (orderBy === 'name') {
        orderByOption.name = 'asc';
    }
    else if (orderBy === 'createdAt') {
        orderByOption.created_at = 'desc';
    }
    const totalCount = await prisma_1.prisma.supplier.count({ where });
    const suppliers = await prisma_1.prisma.supplier.findMany({
        where,
        orderBy: orderByOption,
    });
    return {
        suppliers,
        totalCount,
    };
}
async function generatePDF(suppliers) {
    const fonts = {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique',
        },
    };
    const body = suppliers.map((supplier, index) => [
        { text: index + 1, style: 'cellCenter' },
        { text: supplier.name, style: 'cell' },
        { text: supplier.email, style: 'cell' },
        { text: supplier.cnpj, style: 'cellCenter' },
        { text: supplier.phone ? supplier.phone : '-', style: 'cell' },
        {
            text: [
                supplier === null || supplier === void 0 ? void 0 : supplier.address,
                supplier === null || supplier === void 0 ? void 0 : supplier.number,
                supplier === null || supplier === void 0 ? void 0 : supplier.neighborhood,
                supplier === null || supplier === void 0 ? void 0 : supplier.city,
                supplier === null || supplier === void 0 ? void 0 : supplier.state,
                supplier === null || supplier === void 0 ? void 0 : supplier.complement,
            ]
                .filter(Boolean)
                .join(', '),
            style: 'cell',
        },
    ]);
    const printer = new pdfmake_1.default(fonts);
    const docDefinitions = {
        defaultStyle: {
            font: 'Helvetica',
        },
        pageOrientation: 'landscape',
        pageMargins: [20, 20, 20, 20],
        footer: function (currentPage, pageCount) {
            return {
                text: currentPage.toString() + ' / ' + pageCount,
                alignment: 'right',
                style: {
                    fontSize: 8,
                },
                margin: [0, 0, 20, 0],
            };
        },
        content: [
            {
                columns: [
                    { text: 'Relatório de Fornecedores', style: 'header', width: '*' },
                    { text: (0, date_util_1.getAtualDateWithHours)(), style: 'header', width: 'auto' },
                ],
            },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
                    body: [
                        [
                            { text: 'Ord.', style: 'columnsTitle' },
                            { text: 'Nome', style: 'columnsTitle' },
                            { text: 'E-mail', style: 'columnsTitle' },
                            { text: 'CNPJ', style: 'columnsTitle' },
                            { text: 'Telefone', style: 'columnsTitle' },
                            { text: 'Endereço', style: 'columnsTitle' },
                        ],
                        ...body,
                    ],
                },
            },
            {
                columns: [
                    { text: 'Total de Fornecedores:', style: 'legend', width: '*' },
                    { text: suppliers.length, style: 'legend', width: 'auto' },
                ],
            },
        ],
        styles: {
            header: {
                fontSize: 8,
                bold: true,
            },
            columnsTitle: {
                fontSize: 8,
                bold: true,
            },
            cell: {
                fontSize: 8,
            },
            cellCenter: {
                fontSize: 8,
                alignment: 'center',
            },
            legend: {
                fontSize: 8,
                marginTop: 3,
                bold: true,
            },
        },
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinitions);
    return pdfDoc;
}
exports.default = {
    create,
    findAll,
    findById,
    update,
    findAllOptions,
    generatePDF,
    findAllToReport,
};
