"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const request_validator_1 = require("../middlewares/request-validator");
const user_schema_1 = require("../schemas/user.schema");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/", (0, request_validator_1.requestBodyValidation)(user_schema_1.userSchema), user_controller_1.default.create);
exports.default = userRoutes;
