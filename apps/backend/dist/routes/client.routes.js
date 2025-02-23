"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controller_1 = __importDefault(require("../controllers/client.controller"));
const request_validator_1 = require("../middlewares/request-validator");
const client_schema_1 = require("../schemas/client.schema");
const clientRoutes = (0, express_1.Router)();
clientRoutes.get("/report", client_controller_1.default.generatePDF);
clientRoutes.post("/", (0, request_validator_1.requestBodyValidation)(client_schema_1.clientSchema), client_controller_1.default.create);
clientRoutes.get('/options', client_controller_1.default.findAllOptions);
clientRoutes.get("/", client_controller_1.default.findAll);
clientRoutes.put("/:id", (0, request_validator_1.requestBodyValidation)(client_schema_1.clientSchema), client_controller_1.default.update);
exports.default = clientRoutes;
