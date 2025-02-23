"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const request_validator_1 = require("../middlewares/request-validator");
const auth_schema_1 = require("../schemas/auth.schema");
const authRoutes = (0, express_1.Router)();
authRoutes.post('/login', (0, request_validator_1.requestBodyValidation)(auth_schema_1.loginSchema), auth_controller_1.default.login);
authRoutes.post('/register', (0, request_validator_1.requestBodyValidation)(auth_schema_1.registerSchema), auth_controller_1.default.register);
exports.default = authRoutes;
