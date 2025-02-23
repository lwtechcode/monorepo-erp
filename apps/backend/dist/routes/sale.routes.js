"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sale_controller_1 = __importDefault(require("../controllers/sale.controller"));
const request_validator_1 = require("../middlewares/request-validator");
const sales_schema_1 = require("../schemas/sales.schema");
const saleRoutes = (0, express_1.Router)();
saleRoutes.get('/', sale_controller_1.default.findAll);
saleRoutes.post('/', (0, request_validator_1.requestBodyValidation)(sales_schema_1.saleSchema), sale_controller_1.default.create);
saleRoutes.get('/:id', sale_controller_1.default.findById);
saleRoutes.get('/:id/coupon', sale_controller_1.default.generateCoupon);
exports.default = saleRoutes;
