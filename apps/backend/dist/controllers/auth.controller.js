"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const status_code_1 = require("../constants/status-code");
const response_messages_1 = require("../constants/response-messages");
const jtw_util_1 = __importDefault(require("../utils/jtw.util"));
const company_service_1 = __importDefault(require("../services/company.service"));
const user_service_1 = __importDefault(require("../services/user.service"));
async function login(request, response) {
    try {
        const body = request.body;
        const userExists = await auth_service_1.default.findByEmail(body.email);
        if (!userExists) {
            return response
                .status(status_code_1.STATUS_CODE.BAD_REQUEST)
                .json({ message: response_messages_1.RESPONSE_MESSAGE.INVALID_LOGIN_DATA });
        }
        const matchPassword = bcrypt_1.default.compareSync(body.password, userExists.password);
        if (!matchPassword) {
            return response
                .status(status_code_1.STATUS_CODE.BAD_REQUEST)
                .json({ message: response_messages_1.RESPONSE_MESSAGE.INVALID_LOGIN_DATA });
        }
        return response.status(status_code_1.STATUS_CODE.OK).json({
            name: userExists.name,
            email: userExists.email,
            token: jtw_util_1.default.assignToken({ company_id: userExists.company_id }),
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
async function register(request, response) {
    try {
        const body = request.body;
        const userExists = await auth_service_1.default.findByEmail(body.email);
        if (userExists) {
            return response
                .status(status_code_1.STATUS_CODE.BAD_REQUEST)
                .json({ message: response_messages_1.RESPONSE_MESSAGE.EMAIL_EXISTS });
        }
        const companyCreated = await company_service_1.default.create({
            name: body.company_name,
            active: true,
        });
        const hashedPassword = bcrypt_1.default.hashSync(body.password, 10);
        const userCreated = await user_service_1.default.create({
            active: true,
            company_id: companyCreated.id,
            email: body.email,
            name: body.name,
            password: hashedPassword,
            phone: body.phone,
        });
        return response.status(status_code_1.STATUS_CODE.OK).json({
            name: userCreated.name,
            email: userCreated.email,
            token: jtw_util_1.default.assignToken({ company_id: userCreated.company_id }),
        });
    }
    catch (error) {
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
exports.default = { login, register };
