"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_messages_1 = require("../constants/response-messages");
const status_code_1 = require("../constants/status-code");
const unit_of_measurement_service_1 = __importDefault(require("../services/unit-of-measurement.service"));
async function create(request, response) {
    const body = request.body;
    const company_id = request.company_id;
    try {
        const newData = await unit_of_measurement_service_1.default.create(Object.assign(Object.assign({}, body), { abbreviation: body.abbreviation, company_id }));
        return response.status(status_code_1.STATUS_CODE.CREATED).json({
            message: response_messages_1.RESPONSE_MESSAGE.CREATED_SUCCESSFULLY,
            id: newData.id,
        });
    }
    catch (error) {
        return response.status(status_code_1.STATUS_CODE.SERVICE_UNAVAILABLE).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
async function findAll(request, response) {
    const { page = 1, pageSize = 10, nameOrAbbreviation = '' } = request.query;
    const company_id = request.company_id;
    try {
        const data = await unit_of_measurement_service_1.default.findAll({
            page: Number(page),
            pageSize: Number(pageSize),
            nameOrAbbreviation: String(nameOrAbbreviation),
            companyId: company_id,
        });
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
        const data = await unit_of_measurement_service_1.default.findById({
            id,
            companyId,
        });
        if (!data) {
            return response
                .status(status_code_1.STATUS_CODE.NOT_FOUND)
                .json({ message: response_messages_1.RESPONSE_MESSAGE.NOT_FOUND });
        }
        const dataEdited = await unit_of_measurement_service_1.default.update({
            companyId,
            data: body,
            unitOfMeasurementId: id,
        });
        return response.status(status_code_1.STATUS_CODE.OK).json({
            message: response_messages_1.RESPONSE_MESSAGE.UPDATED_SUCCESSFULLY,
            id: dataEdited.id,
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
        const data = await unit_of_measurement_service_1.default.findAllOptions(company_id);
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
exports.default = {
    create,
    findAll,
    update,
    findAllOptions,
};
