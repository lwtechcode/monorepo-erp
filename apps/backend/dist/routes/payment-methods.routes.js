"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_validator_1 = require("../middlewares/request-validator");
const payment_method_schema_1 = require("../schemas/payment-method.schema");
const payment_method_controller_1 = __importDefault(require("../controllers/payment-method.controller"));
const paymentMethodsRoutes = (0, express_1.Router)();
paymentMethodsRoutes.post('/', (0, request_validator_1.requestBodyValidation)(payment_method_schema_1.paymentMethodSchema), payment_method_controller_1.default.create);
paymentMethodsRoutes.get('/options', payment_method_controller_1.default.findAllOptions);
paymentMethodsRoutes.get('/', payment_method_controller_1.default.findAll);
paymentMethodsRoutes.put('/:id', (0, request_validator_1.requestBodyValidation)(payment_method_schema_1.paymentMethodSchema), payment_method_controller_1.default.update);
exports.default = paymentMethodsRoutes;
