"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sale_budget_controller_1 = __importDefault(require("../controllers/sale-budget.controller"));
const request_validator_1 = require("../middlewares/request-validator");
const sales_budget_schema_1 = require("../schemas/sales-budget.schema");
const saleBudgetRoutes = (0, express_1.Router)();
saleBudgetRoutes.post('/', (0, request_validator_1.requestBodyValidation)(sales_budget_schema_1.saleBudgetSchema), sale_budget_controller_1.default.create);
saleBudgetRoutes.get('/:id', sale_budget_controller_1.default.findById);
saleBudgetRoutes.delete('/:id', sale_budget_controller_1.default.remove);
saleBudgetRoutes.get('/:id/coupon', sale_budget_controller_1.default.generateCoupon);
saleBudgetRoutes.get('/', sale_budget_controller_1.default.findAll);
exports.default = saleBudgetRoutes;
