"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const response_messages_1 = require("../constants/response-messages");
const status_code_1 = require("../constants/status-code");
const bill_to_receive_service_1 = __importDefault(require("../services/bill-to-receive.service"));
const client_service_1 = __importDefault(require("../services/client.service"));
const status_1 = require("../enum/status");
function getCurrentDate() {
    const YEAR = (0, date_fns_1.getYear)(new Date());
    const MONTH = ((0, date_fns_1.getMonth)(new Date()) + 1).toString().padStart(2, "0");
    const DAY = (0, date_fns_1.getDate)(new Date()).toString().padStart(2, "0");
    return `${YEAR}-${MONTH}-${DAY}`;
}
function generateStatus(due_date, pay_date) {
    const currentDate = getCurrentDate();
    const dueDateOnly = due_date;
    if ((pay_date && (0, date_fns_1.isEqual)(dueDateOnly, pay_date)) ||
        (pay_date && (0, date_fns_1.isBefore)(pay_date, due_date))) {
        return status_1.paymentStatusEnum.RECEBIDA;
    }
    if (!pay_date && (0, date_fns_1.isBefore)(dueDateOnly, currentDate)) {
        return status_1.paymentStatusEnum.ATRASADA;
    }
    if ((0, date_fns_1.isAfter)(dueDateOnly, currentDate) || (0, date_fns_1.isEqual)(dueDateOnly, currentDate)) {
        return status_1.paymentStatusEnum.EM_DIA;
    }
    if (pay_date && (0, date_fns_1.isAfter)(pay_date, due_date)) {
        return status_1.paymentStatusEnum.RECEBIDA_COM_ATRASO;
    }
    throw new Error("Status da conta não pode ser definido");
}
async function create(request, response) {
    const body = request.body;
    try {
        const clientExists = await client_service_1.default.findById({
            companyId: request.company_id,
            id: body.client_id,
        });
        if (!clientExists) {
            return response
                .status(status_code_1.STATUS_CODE.BAD_REQUEST)
                .json({ message: "Cliente não encontrado" });
        }
        const data = await bill_to_receive_service_1.default.create(Object.assign(Object.assign({}, body), { companyId: request.company_id, status: generateStatus(body.due_date, body.receipt_date) }));
        return response
            .status(status_code_1.STATUS_CODE.CREATED)
            .json({ message: "Conta a receber criada com sucesso", id: data.id });
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
    const { page = 1, pageSize = 10, endDate, startDate, status, description, } = request.query;
    const companyId = request.company_id;
    try {
        const data = await bill_to_receive_service_1.default.findAllPaginated({
            page: Number(page),
            pageSize: Number(pageSize),
            endDate: endDate,
            startDate: startDate,
            status: status,
            companyId,
            description: description,
        });
        return response.status(status_code_1.STATUS_CODE.OK).json(data);
    }
    catch (error) {
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
            .status(status_code_1.STATUS_CODE.BAD_GATEWAY)
            .json({ message: "Informe o ID da conta a pagar" });
    }
    try {
        const bill = await bill_to_receive_service_1.default.findById({ id, companyId });
        if (!bill) {
            return response
                .status(status_code_1.STATUS_CODE.NOT_FOUND)
                .json({ message: response_messages_1.RESPONSE_MESSAGE.NOT_FOUND });
        }
        const clientExists = await client_service_1.default.findById({
            companyId,
            id: body.client_id,
        });
        if (!clientExists) {
            return response
                .status(status_code_1.STATUS_CODE.NOT_FOUND)
                .json({ message: "Cliente não encontrado" });
        }
        const statusVerified = generateStatus(body.due_date, body.receipt_date);
        const billToPay = await bill_to_receive_service_1.default.update({
            billToReceiveId: id,
            companyId,
            data: Object.assign(Object.assign({}, body), { status: statusVerified }),
        });
        return response.status(status_code_1.STATUS_CODE.OK).json({
            message: response_messages_1.RESPONSE_MESSAGE.UPDATED_SUCCESSFULLY,
            id: billToPay.id,
        });
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
    const companyId = request.company_id;
    try {
        const billToReceive = await bill_to_receive_service_1.default.findById({
            id,
            companyId,
        });
        if (!billToReceive) {
            return response
                .status(status_code_1.STATUS_CODE.NOT_FOUND)
                .json({ message: response_messages_1.RESPONSE_MESSAGE.NOT_FOUND });
        }
        await bill_to_receive_service_1.default.remove({
            id,
            companyId,
        });
        return response
            .status(status_code_1.STATUS_CODE.OK)
            .json({ message: response_messages_1.RESPONSE_MESSAGE.DELETED_SUCCESSFULLY });
    }
    catch (error) {
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
async function changeStatus(_, response) {
    try {
        const billsToReceive = await bill_to_receive_service_1.default.findAll({
            status: status_1.paymentStatusEnum.EM_DIA,
        });
        const ids = [];
        billsToReceive.forEach(async (bill) => {
            const statusVerified = generateStatus(bill.due_date, bill.receipt_date);
            if (statusVerified === status_1.paymentStatusEnum.ATRASADA) {
                ids.push(bill.id);
            }
        });
        if (ids.length > 0) {
            await bill_to_receive_service_1.default.updateStatus({ ids });
        }
        return response.status(status_code_1.STATUS_CODE.OK).json({ message: "ok" });
    }
    catch (error) {
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
async function generatePDF(request, response) {
    try {
        const { nameOrCPF = "", status = "", orderBy = "", endDate = "", startDate = "", } = request.query;
        const company_id = request.company_id;
        const data = await bill_to_receive_service_1.default.findAllToReport({
            description: String(nameOrCPF),
            companyId: company_id,
            status: String(status),
            orderBy: String(orderBy),
            endDate: String(endDate),
            startDate: String(startDate),
        });
        const pdfDoc = await bill_to_receive_service_1.default.generatePDF(data.billsToReceive);
        const chunks = [];
        pdfDoc.on("data", (chunk) => {
            chunks.push(chunk);
        });
        pdfDoc.end();
        pdfDoc.on("end", () => {
            const result = Buffer.concat(chunks);
            response.setHeader("Content-Type", "application/pdf");
            response.setHeader("Content-Disposition", 'attachment; filename="RelatorioContasPagar.pdf"');
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
    update,
    remove,
    changeStatus,
    generatePDF,
};
