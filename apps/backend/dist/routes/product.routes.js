"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const request_validator_1 = require("../middlewares/request-validator");
const product_schema_1 = require("../schemas/product.schema");
const productRoutes = (0, express_1.Router)();
productRoutes.get('/report', product_controller_1.default.generatePDF);
productRoutes.post('/', (0, request_validator_1.requestBodyValidation)(product_schema_1.productSchema), product_controller_1.default.create);
productRoutes.get('/', product_controller_1.default.findAll);
productRoutes.put('/:id', (0, request_validator_1.requestBodyValidation)(product_schema_1.productSchema), product_controller_1.default.update);
exports.default = productRoutes;
