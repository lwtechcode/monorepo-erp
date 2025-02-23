"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_category_controller_1 = __importDefault(require("../controllers/product-category.controller"));
const request_validator_1 = require("../middlewares/request-validator");
const product_category_schema_1 = require("../schemas/product-category.schema");
const productCategoryRoutes = (0, express_1.Router)();
productCategoryRoutes.post('/', (0, request_validator_1.requestBodyValidation)(product_category_schema_1.productCategorySchema), product_category_controller_1.default.create);
productCategoryRoutes.get('/', product_category_controller_1.default.findAll);
productCategoryRoutes.get('/options', product_category_controller_1.default.findAllOptions);
productCategoryRoutes.put('/:id', (0, request_validator_1.requestBodyValidation)(product_category_schema_1.productCategorySchema), product_category_controller_1.default.update);
exports.default = productCategoryRoutes;
