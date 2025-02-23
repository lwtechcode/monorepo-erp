"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = update;
const pdfmake_1 = __importDefault(require("pdfmake"));
const prisma_1 = require("../database/prisma");
const date_util_1 = require("../utils/date.util");
const formatters_1 = require("../utils/formatters");
async function create(data) {
    return prisma_1.prisma.product.create({
        data: {
            discount_tax: data.discount_tax,
            name: data.name,
            cost_price: data.cost_price,
            sale_price: data.sale_price,
            active: data === null || data === void 0 ? void 0 : data.active,
            bar_code: data.bar_code,
            description: data.description,
            location_in_store: data.location_in_store,
            manufacturer: data.manufacturer,
            stock: data.stock,
            model: data.model,
            observation: data.observation,
            product_origin: data.product_origin,
            sku: data.sku,
            supplier_id: data.supplier_id,
            company_id: data.companyId,
            product_category_id: data.product_category_id,
        },
    });
}
async function findById({ id, companyId }) {
    return prisma_1.prisma.product.findUnique({ where: { id, company_id: companyId } });
}
async function findAll({ page, pageSize, companyId, nameOrBarCodeOrSKU, status, orderBy, discount = false, category, }) {
    const where = {
        OR: [
            { name: { contains: nameOrBarCodeOrSKU } },
            { sku: { contains: nameOrBarCodeOrSKU } },
            { bar_code: { contains: nameOrBarCodeOrSKU } },
        ],
    };
    if (status) {
        where.active = status === "ativo";
    }
    if (discount) {
        where.discount = { gt: 0 };
    }
    if (category) {
        where.product_category_id = category;
    }
    if (companyId) {
        Object.assign(where, { company_id: companyId });
    }
    let orderByOption = {};
    if (orderBy === "name") {
        orderByOption.name = "asc";
    }
    else if (orderBy === "createdAt") {
        orderByOption.created_at = "desc";
    }
    const totalCount = await prisma_1.prisma.product.count({ where });
    const totalPages = Math.ceil(totalCount / pageSize);
    const skip = (page - 1) * pageSize;
    const products = await prisma_1.prisma.product.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: orderByOption,
        include: {
            supplier: {
                select: {
                    name: true,
                    id: true,
                },
            },
            productCategory: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return {
        products,
        totalCount,
        totalPages,
    };
}
async function update({ companyId, data, productId }) {
    const updateData = Object.entries(data)
        .filter(([_, value]) => value !== undefined)
        .reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
    return prisma_1.prisma.product.update({
        where: { id: productId, active: true, company_id: companyId },
        data: updateData,
    });
}
async function generatePDF(products) {
    const fonts = {
        Helvetica: {
            normal: "Helvetica",
            bold: "Helvetica-Bold",
            italics: "Helvetica-Oblique",
            bolditalics: "Helvetica-BoldOblique",
        },
    };
    const body = products.map((product, index) => {
        var _a, _b;
        return [
            { text: index + 1, style: "cellCenter" },
            { text: product.name, style: "cell" },
            // { text: product.sku || "-", style: "cellCenter" },
            { text: product.manufacturer || "-", style: "cell" },
            {
                //@ts-ignore
                text: ((_a = product === null || product === void 0 ? void 0 : product.productCategory) === null || _a === void 0 ? void 0 : _a.name) || "-",
                style: "cell",
            },
            { text: product.product_origin || "-", style: "cell" },
            {
                text: product.cost_price
                    ? (0, formatters_1.formatMoney)(Number(product.cost_price))
                    : "-",
                style: "cell",
            },
            {
                text: product.sale_price
                    ? (0, formatters_1.formatMoney)(Number(product.sale_price))
                    : "-",
                style: "cell",
            },
            { text: product.stock || "-", style: "cell" },
            // { text: product.manage_stock ? "S" : "N" || "-", style: "cell" },
            // { text: product.min_stock || "-", style: "cell" },
            { text: product.description || "-", style: "cell" },
            { text: product.observation || "-", style: "cell" },
            {
                //@ts-ignore
                text: ((_b = product.supplier) === null || _b === void 0 ? void 0 : _b.name) || "-",
                style: "cell",
            },
        ];
    });
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
                    { text: "Relatório de Produtos", style: "header", width: "*" },
                    { text: (0, date_util_1.getAtualDateWithHours)(), style: "header", width: "auto" },
                ],
            },
            {
                table: {
                    headerRows: 1,
                    widths: [
                        "auto",
                        "*",
                        // "auto",
                        // "auto",
                        "auto",
                        // "auto",
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
                            // { text: "SKU", style: "columnsTitle" },
                            { text: "Fabricante", style: "columnsTitle" },
                            { text: "Categ.", style: "columnsTitle" },
                            { text: "Orig.", style: "columnsTitle" },
                            { text: "Preço custo", style: "columnsTitle" },
                            { text: "Preço venda", style: "columnsTitle" },
                            { text: "Estoque", style: "columnsTitle" },
                            // { text: "Ger. estoque", style: "columnsTitle" },
                            // { text: "Est. mínimo", style: "columnsTitle" },
                            { text: "Descrição", style: "columnsTitle" },
                            { text: "Observação", style: "columnsTitle" },
                            { text: "Fornecedor", style: "columnsTitle" },
                        ],
                        ...body,
                    ],
                },
            },
            {
                columns: [
                    { text: "Total de Produtos:", style: "legend", width: "*" },
                    { text: products.length, style: "legend", width: "auto" },
                ],
            },
        ],
        styles: {
            header: {
                fontSize: 6,
                bold: true,
            },
            columnsTitle: {
                fontSize: 6,
                bold: true,
            },
            cell: {
                fontSize: 6,
            },
            cellCenter: {
                fontSize: 6,
                alignment: "center",
            },
            legend: {
                fontSize: 6,
                marginTop: 3,
                bold: true,
            },
        },
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinitions);
    return pdfDoc;
}
async function findAllToReport({ companyId, nameOrBarCode, status, orderBy, discount, categoryId, }) {
    const where = {
        active: status === "ativo" || status === "",
        OR: [
            { name: { contains: nameOrBarCode } },
            { sku: { contains: nameOrBarCode } },
            { bar_code: { contains: nameOrBarCode } },
        ],
    };
    if (discount) {
        where.discount_tax = { gt: 0 };
    }
    if (categoryId) {
        where.product_category_id = categoryId;
    }
    if (companyId) {
        Object.assign(where, { company_id: companyId });
    }
    let orderByOption = {};
    if (orderBy === "name") {
        orderByOption.name = "asc";
    }
    else if (orderBy === "createdAt") {
        orderByOption.created_at = "desc";
    }
    else if (orderBy === "price") {
        orderByOption.sale_price = "asc";
    }
    const totalCount = await prisma_1.prisma.product.count({ where });
    const products = await prisma_1.prisma.product.findMany({
        where,
        orderBy: orderByOption,
        include: {
            supplier: {
                select: {
                    name: true,
                    id: true,
                },
            },
            productCategory: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return {
        products,
        totalCount,
    };
}
exports.default = {
    create,
    findById,
    findAll,
    update,
    findAllToReport,
    generatePDF,
};
