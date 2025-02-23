"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = update;
const prisma_1 = require("../database/prisma");
const date_util_1 = require("../utils/date.util");
const pdfmake_1 = __importDefault(require("pdfmake"));
const formatters_1 = require("../utils/formatters");
async function create(data) {
    return prisma_1.prisma.client.create({
        data: {
            gender: data.gender,
            name: data.name,
            active: true,
            address: data.address,
            birthDate: data.birthDate ? new Date(data.birthDate) : null,
            cep: data.cep,
            city: data.city,
            complement: data.complement,
            cpf: data.cpf,
            email: data.email,
            neighborhood: data.neighborhood,
            number: data.number,
            phone: data.phone,
            company_id: data.company_id,
            state: data.state,
            rg: data.rg,
            observation: data.observation,
        },
    });
}
async function findById({ id, companyId }) {
    return prisma_1.prisma.client.findUnique({ where: { id, company_id: companyId } });
}
async function findAll({ page, pageSize, companyId, nameOrCPF, status, orderBy, }) {
    const where = {
        company_id: companyId,
    };
    if (status) {
        where.active = status === "ativo";
    }
    if (nameOrCPF) {
        where.OR = [
            { name: { contains: nameOrCPF, mode: "insensitive" } },
            { cpf: { contains: nameOrCPF.replace(/[.-]/g, "") } },
            { id: { contains: nameOrCPF } },
        ];
    }
    let orderByOption = {};
    if (orderBy === "name") {
        orderByOption.name = "asc";
    }
    else if (orderBy === "createdAt") {
        orderByOption.created_at = "desc";
    }
    const totalCount = await prisma_1.prisma.client.count({ where });
    const totalPages = Math.ceil(totalCount / pageSize);
    const skip = (page - 1) * pageSize;
    const clients = await prisma_1.prisma.client.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: orderByOption,
    });
    return {
        clients,
        totalCount,
        totalPages,
    };
}
async function update(clientId, data, companyId) {
    const updateData = Object.entries(data)
        .filter(([_, value]) => value !== undefined)
        .reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
    return prisma_1.prisma.client.update({
        where: { id: clientId, company_id: companyId },
        data: updateData,
    });
}
async function findAllOptions(companyId) {
    const clients = await prisma_1.prisma.client.findMany({
        where: { company_id: companyId },
    });
    return clients.map((client) => ({
        value: client.id,
        label: client.name,
    }));
}
async function generatePDF(clients) {
    const fonts = {
        Helvetica: {
            normal: "Helvetica",
            bold: "Helvetica-Bold",
            italics: "Helvetica-Oblique",
            bolditalics: "Helvetica-BoldOblique",
        },
    };
    const body = clients.map((client, index) => [
        { text: index + 1, style: "cellCenter" },
        { text: client.name, style: "cell" },
        { text: client.gender, style: "cellCenter" },
        { text: client.cpf ? (0, formatters_1.formatCPF)(client.cpf) : "-", style: "cell" },
        { text: client.rg, style: "cell" },
        { text: client.phone ? (0, formatters_1.formatPhone)(client.phone) : "-", style: "cell" },
        { text: client.email, style: "cell" },
        {
            text: client.birthDate ? (0, formatters_1.formatDate)(client.birthDate) : "--",
            style: "cell",
        },
        { text: client.city, style: "cell" },
        { text: client.state, style: "cell" },
        { text: client.active ? "Ativo" : "Inativo", style: "cell" },
    ]);
    const printer = new pdfmake_1.default(fonts);
    const docDefinitions = {
        defaultStyle: {
            font: "Helvetica",
        },
        pageOrientation: "landscape",
        pageMargins: [20, 20, 20, 20],
        footer: function (currentPage, pageCount) {
            return {
                text: currentPage.toString() + " / " + pageCount,
                alignment: "right",
                style: {
                    fontSize: 8,
                },
                margin: [0, 0, 20, 0],
            };
        },
        content: [
            {
                columns: [
                    { text: "Relatório de Clientes", style: "header", width: "*" },
                    { text: (0, date_util_1.getAtualDateWithHours)(), style: "header", width: "auto" },
                ],
            },
            {
                table: {
                    headerRows: 1,
                    widths: [
                        "auto",
                        "*",
                        "auto",
                        "auto",
                        "auto",
                        "auto",
                        "auto",
                        "auto",
                        "auto",
                        "auto",
                        "auto",
                    ],
                    body: [
                        [
                            { text: "Ord.", style: "columnsTitle" },
                            { text: "Nome", style: "columnsTitle" },
                            { text: "Gênero", style: "columnsTitle" },
                            { text: "CPF", style: "columnsTitle" },
                            { text: "RG", style: "columnsTitle" },
                            { text: "Telefone", style: "columnsTitle" },
                            { text: "Email", style: "columnsTitle" },
                            { text: "Data Nasc", style: "columnsTitle" },
                            { text: "Cidade", style: "columnsTitle" },
                            { text: "Estado", style: "columnsTitle" },
                            { text: "Status", style: "columnsTitle" },
                        ],
                        ...body,
                    ],
                },
            },
            {
                columns: [
                    { text: "Total de Clientes:", style: "legend", width: "*" },
                    { text: clients.length, style: "legend", width: "auto" },
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
                alignment: "center",
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
async function findAllToReport({ companyId, nameOrCPF, status, orderBy, }) {
    const where = {
        company_id: companyId,
    };
    if (status) {
        where.active = status === "ativo";
    }
    if (nameOrCPF) {
        where.OR = [
            { name: { contains: nameOrCPF, mode: "insensitive" } },
            { cpf: { contains: nameOrCPF.replace(/[.-]/g, "") } },
        ];
    }
    let orderByOption = {};
    if (orderBy === "name") {
        orderByOption.name = "asc";
    }
    else if (orderBy === "createdAt") {
        orderByOption.created_at = "desc";
    }
    const totalCount = await prisma_1.prisma.client.count({ where });
    const clients = await prisma_1.prisma.client.findMany({
        where,
        orderBy: orderByOption,
    });
    return {
        clients,
        totalCount,
    };
}
exports.default = {
    findAllToReport,
    create,
    findById,
    findAll,
    update,
    findAllOptions,
    generatePDF,
};
