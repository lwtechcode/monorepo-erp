"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_messages_1 = require("../constants/response-messages");
const status_code_1 = require("../constants/status-code");
const user_service_1 = __importDefault(require("../services/user.service"));
const company_service_1 = __importDefault(require("../services/company.service"));
async function create(request, response) {
    const body = request.body;
    try {
        const companyExists = await company_service_1.default.findById(request.company_id);
        if (!companyExists) {
            return response
                .status(status_code_1.STATUS_CODE.BAD_REQUEST)
                .json({ message: "ID da empresa não encontrado" });
        }
        const emailExists = await user_service_1.default.findByEmail({
            email: body.email,
            company_id: request.company_id,
        });
        if (emailExists) {
            return response
                .status(status_code_1.STATUS_CODE.BAD_REQUEST)
                .json({ message: `O e-mail ${body.email} já está sendo usado` });
        }
        body.password = bcrypt_1.default.hashSync(body.password, 10);
        const data = await user_service_1.default.create(Object.assign(Object.assign({}, body), { company_id: "clvtlv70e000058bjyux9ynsx" }));
        return response
            .status(status_code_1.STATUS_CODE.CREATED)
            .json({ message: "Usuário criado com sucesso", id: data.id });
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
