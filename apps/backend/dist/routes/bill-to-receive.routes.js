"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_validator_1 = require("../middlewares/request-validator");
const bill_to_receive_controller_1 = __importDefault(require("../controllers/bill-to-receive.controller"));
const bill_to_receive_schema_1 = require("../schemas/bill-to-receive.schema");
const billToReceiveRoutes = (0, express_1.Router)();
billToReceiveRoutes.get("/report", bill_to_receive_controller_1.default.generatePDF);
billToReceiveRoutes.get("/", bill_to_receive_controller_1.default.findAll);
billToReceiveRoutes.post("/", (0, request_validator_1.requestBodyValidation)(bill_to_receive_schema_1.billToReceiveSchema), bill_to_receive_controller_1.default.create);
billToReceiveRoutes.put("/:id", (0, request_validator_1.requestBodyValidation)(bill_to_receive_schema_1.billToReceiveSchema), bill_to_receive_controller_1.default.update);
billToReceiveRoutes.delete("/:id", bill_to_receive_controller_1.default.remove);
exports.default = billToReceiveRoutes;
