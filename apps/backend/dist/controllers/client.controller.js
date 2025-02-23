"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_messages_1 = require("../constants/response-messages");
const status_code_1 = require("../constants/status-code");
const client_service_1 = __importDefault(require("../services/client.service"));
async function create(request, response) {
    const body = request.body;
    try {
        const data = await client_service_1.default.create(Object.assign(Object.assign({}, body), { company_id: request.company_id }));
        return response
            .status(status_code_1.STATUS_CODE.CREATED)
            .json({ message: 'Cliente criado com sucesso', id: data.id });
    }
    catch (error) {
        console.log(error);
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
async function findAll(request, response) {
    const { page = 1, pageSize = 10, nameOrCPF = '', status = '', orderBy = '', } = request.query;
    const company_id = request.company_id;
    try {
        const data = await client_service_1.default.findAll({
            page: Number(page),
            pageSize: Number(pageSize),
            nameOrCPF: String(nameOrCPF),
            companyId: company_id,
            status: String(status),
            orderBy: String(orderBy),
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
async function update(request, response) {
    const { id } = request.params;
    const company_id = request.company_id;
    const body = request.body;
    // console.log(id);
    if (!id) {
        return response
            .status(status_code_1.STATUS_CODE.BAD_GATEWAY)
            .json({ message: response_messages_1.RESPONSE_MESSAGE.PROVIDE_RECORD_ID });
    }
    try {
        const client = await client_service_1.default.findById({ id, companyId: company_id });
        if (!client) {
            return response.status(404).json({ message: response_messages_1.RESPONSE_MESSAGE.NOT_FOUND });
        }
        const clientEdited = await client_service_1.default.update(id, body, company_id);
        return response.status(status_code_1.STATUS_CODE.OK).json({
            message: response_messages_1.RESPONSE_MESSAGE.UPDATED_SUCCESSFULLY,
            id: clientEdited.id,
        });
    }
    catch (error) {
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
async function findAllOptions(request, response) {
    const company_id = request.company_id;
    try {
        const data = await client_service_1.default.findAllOptions(company_id);
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
        const { nameOrCPF = '', status = '', orderBy = '' } = request.query;
        const company_id = request.company_id;
        const clients = await client_service_1.default.findAllToReport({
            nameOrCPF: String(nameOrCPF),
            companyId: company_id,
            status: String(status),
            orderBy: String(orderBy),
        });
        const pdfDoc = await client_service_1.default.generatePDF(clients.clients);
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
exports.default = { create, findAll, update, findAllOptions, generatePDF };
