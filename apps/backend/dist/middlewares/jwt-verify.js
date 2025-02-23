"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = jwtVerify;
const jtw_util_1 = __importDefault(require("../utils/jtw.util"));
function jwtVerify(request, response, next) {
    var _a, _b;
    const authToken = (_b = (_a = request.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    if (!authToken) {
        return response.status(401).json({ message: 'Usuário não autorizado' });
    }
    const isValidToken = jtw_util_1.default.checkAssignToken(authToken);
    if (!isValidToken) {
        return response.status(401).json({ message: 'Usuário não autorizado' });
    }
    request.company_id = isValidToken.company_id;
    next();
}
