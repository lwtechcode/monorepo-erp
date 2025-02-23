"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function assignToken(data) {
    return jsonwebtoken_1.default.sign(data, process.env.HASH_TOKEN);
}
function checkAssignToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.HASH_TOKEN);
    }
    catch (error) {
        throw new Error("Informe um token válido");
    }
}
exports.default = { assignToken, checkAssignToken };
