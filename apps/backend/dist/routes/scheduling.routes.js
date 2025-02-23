"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bill_to_pay_controller_1 = __importDefault(require("../controllers/bill-to-pay.controller"));
const bill_to_receive_controller_1 = __importDefault(require("../controllers/bill-to-receive.controller"));
const schedulingRoutes = (0, express_1.Router)();
schedulingRoutes.get("/cronjob-change-status-bill-to-pay", bill_to_pay_controller_1.default.changeStatus);
schedulingRoutes.get("/cronjob-change-status-bill-to-receive", bill_to_receive_controller_1.default.changeStatus);
exports.default = schedulingRoutes;
