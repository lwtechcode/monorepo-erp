"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_validator_1 = require("../middlewares/request-validator");
const bill_to_pay_controller_1 = __importDefault(require("../controllers/bill-to-pay.controller"));
const bill_to_pay_schema_1 = require("../schemas/bill-to-pay.schema");
const billToPayRoutes = (0, express_1.Router)();
billToPayRoutes.get("/report", bill_to_pay_controller_1.default.generatePDF);
billToPayRoutes.get("/", bill_to_pay_controller_1.default.findAll);
billToPayRoutes.post("/", (0, request_validator_1.requestBodyValidation)(bill_to_pay_schema_1.billToPaySchema), bill_to_pay_controller_1.default.create);
billToPayRoutes.put("/:id", (0, request_validator_1.requestBodyValidation)(bill_to_pay_schema_1.billToPayUpdateSchema), bill_to_pay_controller_1.default.update);
billToPayRoutes.delete("/:id", bill_to_pay_controller_1.default.remove);
exports.default = billToPayRoutes;
