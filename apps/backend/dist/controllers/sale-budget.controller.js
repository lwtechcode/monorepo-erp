"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_messages_1 = require("../constants/response-messages");
const status_code_1 = require("../constants/status-code");
const client_service_1 = __importDefault(require("../services/client.service"));
const payment_method_service_1 = __importDefault(require("../services/payment-method.service"));
const product_sale_budget_service_1 = __importDefault(require("../services/product-sale-budget.service"));
const product_service_1 = __importDefault(require("../services/product.service"));
const sale_budget_service_1 = __importDefault(require("../services/sale-budget.service"));
async function create(request, response) {
    const body = request.body;
    try {
        // Verificar a existência do cliente, se fornecido
        if (body.client_id) {
            const clientExists = await client_service_1.default.findById({
                id: body.client_id,
                companyId: request.company_id,
            });
            if (!clientExists) {
                return response
                    .status(status_code_1.STATUS_CODE.BAD_REQUEST)
                    .json({ message: 'Cliente não encontrado' });
            }
        }
        // Verificar a existência do método de pagamento
        const paymentMethodExists = await payment_method_service_1.default.findById({
            id: body.payment_method_id,
            companyId: request.company_id,
        });
        if (!paymentMethodExists) {
            return response
                .status(status_code_1.STATUS_CODE.BAD_REQUEST)
                .json({ message: 'Método de pagamento não encontrado' });
        }
        // Montar a lista de produtos
        const productsMounted = await Promise.all(body === null || body === void 0 ? void 0 : body.products.map(async (item) => {
            // Verificar a existência do produto
            const product = await product_service_1.default.findById({
                companyId: request.company_id,
                id: item.id,
            });
            if (!product) {
                throw new Error(`Produto com o id ${item.id} não foi encontrado`);
            }
            // Retornar o produto montado
            return {
                name: product.name,
                original_price: Number(product.sale_price),
                discounted_price: item.discounted_price || Number(product.sale_price),
                company_id: request.company_id,
                product_id: product.id,
                qty: item.qty,
                sale_id: '',
                id: '',
            };
        }));
        // Calcular o valor total dos produtos
        const PRODUCTS_TOTAL = productsMounted.reduce((acc, product) => product.qty * product.discounted_price + acc, 0);
        // Criar a venda
        const saleBudget = await sale_budget_service_1.default.create({
            companyId: request.company_id,
            discount_value: body.discount_value || 0,
            increase_value: body.increase_value || 0,
            payment_method_id: body.payment_method_id,
            client_id: body.client_id,
            total_value: PRODUCTS_TOTAL,
            tax_payment_value: (PRODUCTS_TOTAL * (Number(paymentMethodExists.tax) || 0)) / 100,
            products: [],
        });
        // Relacionar os produtos à venda
        await Promise.all(productsMounted.map(async (item) => {
            await product_sale_budget_service_1.default.create({
                company_id: request.company_id,
                discounted_price: item.discounted_price,
                name: item.name,
                original_price: item.original_price,
                product_id: item.product_id,
                qty: item.qty,
                sales_budget_id: saleBudget.id,
                id: '',
            });
        }));
        return response
            .status(status_code_1.STATUS_CODE.CREATED)
            .json({ message: 'Orçamento salvo com sucesso', id: saleBudget.id });
    }
    catch (error) {
        console.error(error);
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error: error.message || error,
        });
    }
}
async function findAll(request, response) {
    const { page = 1, pageSize = 10 } = request.query;
    const company_id = request.company_id;
    try {
        const data = await sale_budget_service_1.default.findAll({
            company_id,
            page: Number(page),
            pageSize: Number(pageSize),
        });
        return response.status(status_code_1.STATUS_CODE.OK).json(data);
    }
    catch (error) {
        console.log(error);
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
async function findById(request, response) {
    const { id } = request.params;
    const company_id = request.company_id;
    try {
        const data = await sale_budget_service_1.default.findById({
            company_id,
            id,
        });
        return response.status(status_code_1.STATUS_CODE.OK).json(data);
    }
    catch (error) {
        console.log(error);
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
async function remove(request, response) {
    const { id } = request.params;
    const company_id = request.company_id;
    try {
        const data = await sale_budget_service_1.default.findById({
            company_id,
            id,
        });
        if (!data) {
            return response
                .status(status_code_1.STATUS_CODE.NOT_FOUND)
                .json({ message: response_messages_1.RESPONSE_MESSAGE.NOT_FOUND });
        }
        await sale_budget_service_1.default.remove({ company_id, id });
        return response
            .status(status_code_1.STATUS_CODE.OK)
            .json({ message: response_messages_1.RESPONSE_MESSAGE.DELETED_SUCCESSFULLY });
    }
    catch (error) {
        console.log(error);
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
async function generateCoupon(request, response) {
    try {
        const { id } = request.params;
        const company_id = request.company_id;
        const pdfDoc = await sale_budget_service_1.default.generateCoupon({ id, company_id });
        const chunks = [];
        pdfDoc.on('data', (chunk) => {
            chunks.push(chunk);
        });
        pdfDoc.end();
        pdfDoc.on('end', () => {
            const result = Buffer.concat(chunks);
            response.setHeader('Content-Type', 'application/pdf');
            response.setHeader('Content-Disposition', 'attachment; filename="RelatorioClientes.pdf"');
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
exports.default = {
    create,
    findAll,
    findById,
    generateCoupon,
    remove,
};
