"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfmake_1 = __importDefault(require("pdfmake"));
const prisma_1 = require("../database/prisma");
const status_1 = require("../enum/status");
const date_util_1 = require("../utils/date.util");
const formatters_1 = require("../utils/formatters");
async function create(data) {
    return prisma_1.prisma.billToReceive.create({
        data: {
            description: data.description,
            due_date: new Date(data.due_date),
            client_id: data.client_id,
            observation: data.observation,
            receipt_date: data.receipt_date ? new Date(data.receipt_date) : null,
            value: data.value ? data.value : 0,
            company_id: data.companyId,
        },
    });
}
async function findAll({ status }) {
    const where = {};
    if (status) {
        where.status = status;
    }
    return prisma_1.prisma.billToReceive.findMany({ where });
}
async function findAllPaginated({ page, pageSize, companyId, description, startDate, endDate, status, }) {
    var _a, _b;
    const where = {
        company_id: companyId,
    };
    if (description) {
        where.description = {
            contains: description,
            mode: "insensitive",
        };
    }
    if (startDate && endDate) {
        const startDateUTC = new Date(`${startDate}T00:00:00.000Z`);
        const endDateUTC = new Date(`${endDate}T23:59:59.999Z`);
        where.due_date = {
            gte: startDateUTC.toISOString(),
            lte: endDateUTC.toISOString(),
        };
    }
    if (status) {
        where.status = Number(status);
    }
    const [totalCount, totalBillsToReceive] = await Promise.all([
        prisma_1.prisma.billToReceive.count({ where }),
        prisma_1.prisma.billToReceive.aggregate({
            where,
            _sum: {
                value: true,
            },
        }),
    ]);
    const totalPages = Math.ceil(totalCount / pageSize);
    const skip = (page - 1) * pageSize;
    const billsToReceive = await prisma_1.prisma.billToReceive.findMany({
        where,
        orderBy: { created_at: "asc" },
        skip,
        take: pageSize,
        include: {
            client: {
                select: {
                    name: true,
                },
            },
        },
    });
    const totalValue = (_b = Number((_a = totalBillsToReceive._sum) === null || _a === void 0 ? void 0 : _a.value)) !== null && _b !== void 0 ? _b : 0;
    // (Number(totalBillsToReceive._sum?.added_value) ?? 0);
    return {
        billsToReceive,
        totalCount,
        totalPages,
        totalBillsToPay: totalValue,
    };
}
async function findById({ id, companyId }) {
    const where = {
        id,
        company_id: companyId,
    };
    return await prisma_1.prisma.billToReceive.findUnique({
        where,
    });
}
async function update({ billToReceiveId, companyId, data }) {
    const updateData = Object.entries(data)
        .filter(([_, value]) => value !== undefined)
        .reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
    return prisma_1.prisma.billToReceive.update({
        where: { id: billToReceiveId, company_id: companyId },
        data: Object.assign(Object.assign({}, updateData), { due_date: updateData ? new Date(updateData.due_date) : null }),
    });
}
async function remove({ id, companyId }) {
    const where = {
        id,
        company_id: companyId,
    };
    return await prisma_1.prisma.billToReceive.delete({
        where,
    });
}
async function updateStatus({ ids }) {
    return await prisma_1.prisma.billToReceive.updateMany({
        where: {
            id: {
                in: ids,
            },
        },
        data: {
            status: status_1.paymentStatusEnum.ATRASADA,
        },
    });
}
async function generatePDF(billsToReceive) {
    const fonts = {
        Helvetica: {
            normal: "Helvetica",
            bold: "Helvetica-Bold",
            italics: "Helvetica-Oblique",
            bolditalics: "Helvetica-BoldOblique",
        },
    };
    const body = billsToReceive.map((billToReceive, index) => {
        var _a;
        return [
            { text: index + 1, style: "cellCenter" },
            { text: billToReceive.description, style: "cell" },
            { text: (0, formatters_1.formatDate)(billToReceive.due_date), style: "cellCenter" },
            { text: (0, formatters_1.formatMoney)(Number(billToReceive.value)), style: "cell" },
            {
                text: billToReceive.receipt_date
                    ? (0, formatters_1.formatDate)(billToReceive.receipt_date)
                    : "-",
                style: "cell",
            },
            //@ts-ignore
            { text: (_a = billToReceive.client) === null || _a === void 0 ? void 0 : _a.name, style: "cell" },
            {
                text: billToReceive.status
                    ? (0, status_1.getFormattedPaymentStatus)(billToReceive.status)
                    : "-",
                style: "cell",
            },
        ];
    });
    const printer = new pdfmake_1.default(fonts);
    const docDefinitions = {
        defaultStyle: {
            font: "Helvetica",
        },
        pageOrientation: "portrait",
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
                    {
                        text: "Relatório de contas a receber",
                        style: "header",
                        width: "*",
                    },
                    { text: (0, date_util_1.getAtualDateWithHours)(), style: "header", width: "auto" },
                ],
            },
            {
                table: {
                    headerRows: 1,
                    widths: ["auto", "*", "auto", "auto", "auto", "auto", "auto"],
                    body: [
                        [
                            { text: "Ord.", style: "columnsTitle" },
                            { text: "Descrição", style: "columnsTitle" },
                            { text: "Data Vencimento", style: "columnsTitle" },
                            { text: "Valor", style: "columnsTitle" },
                            { text: "Data Recebimento", style: "columnsTitle" },
                            { text: "Credor", style: "columnsTitle" },
                            { text: "Status", style: "columnsTitle" },
                        ],
                        ...body,
                    ],
                },
            },
            {
                columns: [
                    { text: "Total de Contas:", style: "legend", width: "*" },
                    { text: billsToReceive.length, style: "legend", width: "auto" },
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
async function findAllToReport({ companyId, description, startDate, endDate, status, }) {
    const where = {
        company_id: companyId,
    };
    if (description) {
        where.description = {
            contains: description,
            mode: "insensitive",
        };
    }
    if (startDate && endDate) {
        const startDateUTC = new Date(`${startDate}T00:00:00.000Z`);
        const endDateUTC = new Date(`${endDate}T23:59:59.999Z`);
        where.due_date = {
            gte: startDateUTC.toISOString(),
            lte: endDateUTC.toISOString(),
        };
    }
    if (status) {
        where.status = Number(status);
    }
    // let orderByOption: any = {};
    // if (orderBy === "name") {
    //   orderByOption.name = "asc";
    // } else if (orderBy === "createdAt") {
    //   orderByOption.created_at = "desc";
    // }
    const totalCount = await prisma_1.prisma.billToReceive.count({ where });
    const billsToReceive = await prisma_1.prisma.billToReceive.findMany({
        where,
        orderBy: { created_at: "asc" },
        include: {
            client: {
                select: {
                    name: true,
                },
            },
        },
        // orderBy: orderByOption,
    });
    return {
        billsToReceive,
        totalCount,
    };
}
exports.default = {
    findAllPaginated,
    findAll,
    create,
    findById,
    update,
    remove,
    updateStatus,
    findAllToReport,
    generatePDF,
};
