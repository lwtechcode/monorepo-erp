"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplier_controller_1 = __importDefault(require("../controllers/supplier.controller"));
const request_validator_1 = require("../middlewares/request-validator");
const supplier_schema_1 = require("../schemas/supplier.schema");
const supplierRoutes = (0, express_1.Router)();
supplierRoutes.get('/report', supplier_controller_1.default.generatePDF);
supplierRoutes.get('/options', supplier_controller_1.default.findAllOptions);
supplierRoutes.post('/', (0, request_validator_1.requestBodyValidation)(supplier_schema_1.supplierSchema), supplier_controller_1.default.create);
supplierRoutes.get('/', supplier_controller_1.default.findAll);
supplierRoutes.put('/:id', (0, request_validator_1.requestBodyValidation)(supplier_schema_1.supplierSchema), supplier_controller_1.default.update);
exports.default = supplierRoutes;
