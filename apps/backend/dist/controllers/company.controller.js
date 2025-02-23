"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const company_service_1 = __importDefault(require("../services/company.service"));
const status_code_1 = require("../constants/status-code");
const response_messages_1 = require("../constants/response-messages");
async function create(request, response) {
    const body = request.body;
    try {
        const company = await company_service_1.default.create(body);
        return response
            .status(status_code_1.STATUS_CODE.CREATED)
            .json({ message: "Empresa criada com sucesso", id: company.id });
    }
    catch (error) {
        console.log(error);
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
exports.default = { create };
