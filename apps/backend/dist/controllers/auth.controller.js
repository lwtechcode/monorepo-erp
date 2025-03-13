"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.validateCompany = validateCompany;
exports.registerCompany = registerCompany;
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_messages_1 = require("../constants/response-messages");
const status_code_1 = require("../constants/status-code");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const jtw_util_1 = __importDefault(require("../utils/jtw.util"));
const email_1 = require("../utils/email");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function login(request, response) {
    const backendUrl = process.env.BACKEND_HOME_PAGE;
    try {
        const body = request.body;
        const userExists = await auth_service_1.default.findByEmail(body.email);
        if (!userExists) {
            return response
                .status(status_code_1.STATUS_CODE.BAD_REQUEST)
                .json({ message: response_messages_1.RESPONSE_MESSAGE.INVALID_LOGIN_DATA });
        }
        const matchPassword = bcrypt_1.default.compareSync(body.password, userExists.password);
        if (!matchPassword) {
            return response.status(status_code_1.STATUS_CODE.BAD_REQUEST).json({
                message: response_messages_1.RESPONSE_MESSAGE.INVALID_LOGIN_DATA,
            });
        }
        const companyValidated = userExists.company.validate_code_register_at;
        if (!companyValidated) {
            await (0, email_1.sendMail)({
                name: userExists.company.name,
                address: userExists.company.email,
                code: userExists.company.code_register_validation,
                path: 'auth/validate-registration',
                subject: 'Validação de E-mail',
                host: backendUrl,
            });
            return response.status(status_code_1.STATUS_CODE.BAD_REQUEST).json({
                message: response_messages_1.RESPONSE_MESSAGE.COMPANY_NOT_VALIDATED,
                code: 'COMPANY_NOT_VALIDATED',
                detail: 'A empresa ainda não foi validada. Um e-mail de validação foi enviado.',
            });
        }
        return response.status(status_code_1.STATUS_CODE.OK).json({
            name: userExists.name,
            email: userExists.email,
            token: jtw_util_1.default.assignToken({ company_id: userExists.company_id }),
        });
    }
    catch (error) {
        console.log(error);
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
async function validateCompany(request, response) {
    const loginUrl = process.env.FRONTEND_HOME_PAGE;
    try {
        const { code } = request.params;
        const company = await auth_service_1.default.findByCodeRegisterValidation(code);
        if (!company) {
            return response.status(status_code_1.STATUS_CODE.BAD_REQUEST).json({
                message: response_messages_1.RESPONSE_MESSAGE.INVALID_CODE,
            });
        }
        await auth_service_1.default.updateCompanyStatus(company.id);
        const successPage = `
      <html lang="pt-br">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Validação Completa - Sistema</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f7fc;
              color: #333;
              text-align: center;
            }
            .container {
              max-width: 600px;
              margin: 50px auto;
              background-color: #fff;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #4CAF50;
              font-size: 36px;
              margin-bottom: 20px;
            }
            p {
              color: #555;
              font-size: 18px;
              line-height: 1.5;
              margin-bottom: 30px;
            }
            .btn {
              display: inline-block;
              background-color: #4CAF50;
              color: white;
              padding: 14px 30px;
              text-decoration: none;
              font-size: 18px;
              border-radius: 5px;
              transition: background-color 0.3s ease;
            }
            .btn:hover {
              background-color: #45a049;
            }
            footer {
              margin-top: 40px;
              font-size: 12px;
              color: #888;
            }
            footer a {
              color: #4CAF50;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Cadastro Validado com Sucesso!</h1>
            <p>Sua empresa foi validada com sucesso! Agora você pode acessar o sistema usando seu e-mail e senha.</p>
            <a href="${loginUrl}" class="btn">Fazer Login</a>
          </div>
          <footer>
            <p>Se você tiver alguma dúvida, entre em <a href="mailto:support@sistema.com">contato conosco</a>.</p>
            <p>&copy; 2025 Sistema de Cadastro. Todos os direitos reservados.</p>
          </footer>
        </body>
      </html>
    `;
        return response.status(status_code_1.STATUS_CODE.OK).send(successPage);
    }
    catch (error) {
        console.log(error);
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
async function registerCompany(request, response) {
    const backendUrl = process.env.BACKEND_HOME_PAGE;
    try {
        const body = request.body;
        //VERIFICANDO SE ALGUN DADO DA NOVA EMPRESA JÁ EXISTE
        await auth_service_1.default.checkCompanyUniqueness(body.company.cnpj, body.company.phone, body.company.email);
        //VERIFICANDO SE O E-MAIL DO USUÁRIO JÁ EXISTE
        const userExists = await auth_service_1.default.findByEmail(body.adminUser.email);
        if (userExists) {
            return response.status(status_code_1.STATUS_CODE.BAD_REQUEST).json({
                message: response_messages_1.RESPONSE_MESSAGE.EMAIL_USER_ADMIN_EXISTS,
            });
        }
        //CRIANDO A EMPRESA
        const newCompany = await auth_service_1.default.registerCompany(body.company);
        //CRIPTOGRAFANDO A SENHA
        body.adminUser.password = bcrypt_1.default.hashSync(body.adminUser.password, 10);
        //CRIANDO O USUARIO ADMIN DA EMPRESA
        const newUser = await auth_service_1.default.registerUserAdmin(body.adminUser, newCompany.id);
        //PROCURANDO A ROLE ADMIN NO BANCO DE DADOS
        const roleAdmin = await auth_service_1.default.findAdminRole();
        if (!roleAdmin) {
            return response
                .status(status_code_1.STATUS_CODE.BAD_REQUEST)
                .json({ message: response_messages_1.RESPONSE_MESSAGE.ROLE_NOT_FOUND });
        }
        //VINCULADO A ROLE ADMIN AO NOVO USUARIO
        await auth_service_1.default.addRoleAdminUser(newUser.id, roleAdmin.id);
        await (0, email_1.sendMail)({
            name: newCompany.name,
            address: newUser.email,
            code: newCompany.code_register_validation,
            path: 'auth/validate-registration',
            subject: 'Validação de E-mail',
            host: backendUrl,
        });
        return response.status(status_code_1.STATUS_CODE.CREATED).json({
            message: response_messages_1.RESPONSE_MESSAGE.CREATED_SUCCESSFULLY,
        });
    }
    catch (error) {
        console.log(error);
        if (error.message.includes('CNPJ já cadastrado')) {
            return response.status(status_code_1.STATUS_CODE.BAD_REQUEST).json({
                message: response_messages_1.RESPONSE_MESSAGE.CNPJ_EXISTS,
            });
        }
        if (error.message.includes('Telefone já cadastrado')) {
            return response.status(status_code_1.STATUS_CODE.BAD_REQUEST).json({
                message: response_messages_1.RESPONSE_MESSAGE.PHONE_EXISTS,
            });
        }
        if (error.message.includes('Email já cadastrado')) {
            return response.status(status_code_1.STATUS_CODE.BAD_REQUEST).json({
                message: response_messages_1.RESPONSE_MESSAGE.EMAIL_EXISTS,
            });
        }
        return response.status(status_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: response_messages_1.RESPONSE_MESSAGE.OPERATION_FAILED,
            error,
        });
    }
}
exports.default = { login, registerCompany, validateCompany };
