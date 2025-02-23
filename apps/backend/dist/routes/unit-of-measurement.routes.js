"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const unit_of_measurement_controller_1 = __importDefault(require("../controllers/unit-of-measurement.controller"));
const request_validator_1 = require("../middlewares/request-validator");
const unit_of_measurement_schema_1 = require("../schemas/unit-of-measurement.schema");
const unitOfMeasurementRoutes = (0, express_1.Router)();
unitOfMeasurementRoutes.post('/', (0, request_validator_1.requestBodyValidation)(unit_of_measurement_schema_1.unitOfMeasurementSchema), unit_of_measurement_controller_1.default.create);
unitOfMeasurementRoutes.get('/', unit_of_measurement_controller_1.default.findAll);
unitOfMeasurementRoutes.get('/options', unit_of_measurement_controller_1.default.findAllOptions);
unitOfMeasurementRoutes.put('/:id', (0, request_validator_1.requestBodyValidation)(unit_of_measurement_schema_1.unitOfMeasurementSchema), unit_of_measurement_controller_1.default.update);
exports.default = unitOfMeasurementRoutes;
