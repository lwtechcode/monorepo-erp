"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = passwordVerify;
function passwordVerify(request, response, next) {
    var _a;
    const authPassword = (_a = request.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!authPassword) {
        return response.status(401).json({ message: "Usuário não autorizado" });
    }
    const isValidPassword = authPassword === "qP3gG6sR";
    if (!isValidPassword) {
        return response.status(401).json({ message: "Usuário não autorizado" });
    }
    next();
}
