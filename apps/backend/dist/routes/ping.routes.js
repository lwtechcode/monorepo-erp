"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes = (0, express_1.Router)();
authRoutes.get('/', (_, response) => response.json({ message: 'Server is Running! ✅' }));
exports.default = authRoutes;
