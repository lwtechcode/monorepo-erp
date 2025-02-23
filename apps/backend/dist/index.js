"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*' }));
app.use(routes_1.default);
class HttpError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
// Middleware de rota inexistente
app.use((req, res, next) => {
    res.status(404).json({
        response: {
            data: {
                message: 'Ops! Não conseguimos encontrar o que você está procurando. Entre em contato com o suporte para mais informações.',
            },
        },
    });
});
// Middleware de erro (registrado no nível do `app`, não do `Router`)
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        response: {
            data: {
                message: err.message ||
                    'Erro interno no servidor. Entre em contato com o suporte para mais informações.',
            },
        },
    });
});
app.listen(process.env.PORT, () => console.log('Server started on: http://localhost:' + process.env.PORT));
