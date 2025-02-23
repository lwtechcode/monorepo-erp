"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_messages_1 = require("../constants/response-messages");
const status_code_1 = require("../constants/status-code");
const product_category_service_1 = __importDefault(require("../services/product-category.service"));
const product_service_1 = __importDefault(require("../services/product.service"));
const supplier_service_1 = __importDefault(require("../services/supplier.service"));
async function create(request, response) {
    const body = request.body;
    try {
        if (body.supplier_id) {
            const suppliersExists = await supplier_service_1.default.findById({
                companyId: request.company_id,
                id: body.supplier_id,
            });
            if (!suppliersExists) {
                return response
                    .status(status_code_1.STATUS_CODE.BAD_REQUEST)
                    .json({ message: 'Fornecedor não encontrado' });
            }
        }
        if (body.product_category_id) {
            const suppliersExists = await product_category_service_1.default.findById({
                companyId: request.company_id,
                id: body.product_category_id,
            });
            if (!suppliersExists) {
                return response
                    .status(status_code_1.STATUS_CODE.BAD_REQUEST)
                    .json({ message: 'Categoria não encontrada' });
            }
        }
        const data = await product_service_1.default.create(Object.assign(Object.assign({}, body), { companyId: request.company_id }));
        return response
            .status(status_code_1.STATUS_CODE.CREATED)
            .json({ message: 'Produto criado com sucesso', id: data.id });
    }
    catch (error) {
        console.log(error);
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
async function update(request, response) {
    const { id } = request.params;
    const companyId = request.company_id;
    const body = request.body;
    if (!id) {
        return response
            .status(status_code_1.STATUS_CODE.BAD_REQUEST)
            .json({ message: response_messages_1.RESPONSE_MESSAGE.PROVIDE_RECORD_ID });
    }
    try {
        const product = await product_service_1.default.findById({ id, companyId });
        if (body.supplier_id) {
            const suppliersExists = await supplier_service_1.default.findById({
                companyId: request.company_id,
                id: body.supplier_id,
            });
            if (!suppliersExists) {
                return response
                    .status(status_code_1.STATUS_CODE.BAD_REQUEST)
                    .json({ message: 'Fornecedor não encontrado' });
            }
        }
        if (body.product_category_id) {
            const suppliersExists = await product_category_service_1.default.findById({
                companyId: request.company_id,
                id: body.product_category_id,
            });
            if (!suppliersExists) {
                return response
                    .status(status_code_1.STATUS_CODE.BAD_REQUEST)
                    .json({ message: 'Categoria não encontrada' });
            }
        }
        if (!product) {
            return response
                .status(status_code_1.STATUS_CODE.NOT_FOUND)
                .json({ message: response_messages_1.RESPONSE_MESSAGE.NOT_FOUND });
        }
        const productCategoryExists = await product_category_service_1.default.findById({
            id: body.product_category_id,
            companyId,
        });
        if (!productCategoryExists) {
            return response
                .status(status_code_1.STATUS_CODE.NOT_FOUND)
                .json({ message: 'Categoria não encontrado' });
        }
        const productEdited = await product_service_1.default.update({
            companyId,
            data: body,
            productId: id,
        });
        return response.status(status_code_1.STATUS_CODE.OK).json({
            message: response_messages_1.RESPONSE_MESSAGE.UPDATED_SUCCESSFULLY,
            id: productEdited.id,
        });
    }
    catch (error) {
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
async function findAll(request, response) {
    const { page = 1, pageSize = 10, nameOrBarCodeOrSKU = '', status = '', orderBy = '', category = '', discount, } = request.query;
    const companyId = request.company_id;
    try {
        const data = await product_service_1.default.findAll({
            page: Number(page),
            pageSize: Number(pageSize),
            nameOrBarCodeOrSKU: String(nameOrBarCodeOrSKU),
            companyId,
            status: String(status),
            orderBy: String(orderBy),
            discount: discount === 'true',
            category: String(category),
        });
        // return response.send();
        return response.status(status_code_1.STATUS_CODE.OK).json(data);
    }
    catch (error) {
        console.log(error);
        return response.status(status_code_1.STATUS_CODE.SERVICE_UNAVAILABLE).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
async function generatePDF(request, response) {
    try {
        const { nameOrBarCode = '', status = '', orderBy = '' } = request.query;
        const company_id = request.company_id;
        const products = await product_service_1.default.findAllToReport({
            nameOrBarCode: String(nameOrBarCode),
            companyId: company_id,
            status: String(status),
            orderBy: String(orderBy),
        });
        const pdfDoc = await product_service_1.default.generatePDF(products.products);
        const chunks = [];
        pdfDoc.on('data', (chunk) => {
            chunks.push(chunk);
        });
        pdfDoc.end();
        pdfDoc.on('end', () => {
            const result = Buffer.concat(chunks);
            response.setHeader('Content-Type', 'application/pdf');
            response.setHeader('Content-Disposition', 'attachment; filename="RelatorioProdutos.pdf"');
            return response.end(result);
        });
    }
    catch (error) {
        console.log(error);
        response
            .status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR)
            .send(response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED);
    }
}
exports.default = { create, findAll, update, generatePDF };
