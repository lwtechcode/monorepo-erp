"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = __importDefault(require("../controllers/dashboard.controller"));
const dashboardRoutes = (0, express_1.Router)();
dashboardRoutes.get('/', dashboard_controller_1.default.dashboard);
dashboardRoutes.get('/notifications', dashboard_controller_1.default.notifications);
exports.default = dashboardRoutes;
