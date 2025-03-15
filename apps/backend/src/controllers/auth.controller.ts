import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { RESPONSE_MESSAGE } from '../constants/response-messages';
import { STATUS_CODE } from '../constants/status-code';
import { LoginDTO, RegisterCompanyDTO } from '../dto/auth.dto';
import authService from '../services/auth.service';
import { sendMail } from '../utils/email';
import jtwUtils from '../utils/jtw.util';

dotenv.config();

export async function login(request: Request, response: Response) {
  const backendUrl = process.env.BACKEND_HOME_PAGE;

  console.warn('backendUrl:::', process.env.BACKEND_HOME_PAGE);

  try {
    const body: LoginDTO = request.body;

    const userExists = await authService.findByEmail(body.email);

    if (!userExists) {
      return response
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: RESPONSE_MESSAGE.INVALID_LOGIN_DATA });
    }

    const matchPassword = bcrypt.compareSync(
      body.password,
      userExists.password,
    );

    if (!matchPassword) {
      return response.status(STATUS_CODE.BAD_REQUEST).json({
        message: RESPONSE_MESSAGE.INVALID_LOGIN_DATA,
      });
    }

    const companyValidated = userExists.company.validate_code_register_at;

    if (!companyValidated) {
      await sendMail({
        name: userExists.company.name,
        address: userExists.company.email!,
        code: userExists.company.code_register_validation!,
        path: 'auth/validate-registration',
        subject: 'Validação de E-mail',
        host: backendUrl!,
      });

      return response.status(STATUS_CODE.BAD_REQUEST).json({
        message: RESPONSE_MESSAGE.COMPANY_NOT_VALIDATED,
        code: 'COMPANY_NOT_VALIDATED',
        detail:
          'A empresa ainda não foi validada. Um e-mail de validação foi enviado.',
      });
    }

    return response.status(STATUS_CODE.OK).json({
      name: userExists.name,
      email: userExists.email,
      token: jtwUtils.assignToken({ company_id: userExists.company_id }),
    });
  } catch (error) {
    console.log(error);
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

export async function validateCompany(request: Request, response: Response) {
  const loginUrl = process.env.FRONTEND_HOME_PAGE;

  try {
    const { code } = request.params;

    const company = await authService.findByCodeRegisterValidation(code);

    if (!company) {
      return response.status(STATUS_CODE.BAD_REQUEST).json({
        message: RESPONSE_MESSAGE.INVALID_CODE,
      });
    }

    await authService.updateCompanyStatus(company.id);

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

    return response.status(STATUS_CODE.OK).send(successPage);
  } catch (error) {
    console.log(error);
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

export async function registerCompany(request: Request, response: Response) {
  const backendUrl = process.env.BACKEND_HOME_PAGE;

  try {
    const body: RegisterCompanyDTO = request.body;

    //VERIFICANDO SE ALGUN DADO DA NOVA EMPRESA JÁ EXISTE
    await authService.checkCompanyUniqueness(
      body.company.cnpj,
      body.company.phone,
      body.company.email,
    );

    //VERIFICANDO SE O E-MAIL DO USUÁRIO JÁ EXISTE
    const userExists = await authService.findByEmail(body.adminUser.email);

    if (userExists) {
      return response.status(STATUS_CODE.BAD_REQUEST).json({
        message: RESPONSE_MESSAGE.EMAIL_USER_ADMIN_EXISTS,
      });
    }

    //CRIANDO A EMPRESA
    const newCompany = await authService.registerCompany(body.company);

    //CRIPTOGRAFANDO A SENHA
    body.adminUser.password = bcrypt.hashSync(body.adminUser.password, 10);

    //CRIANDO O USUARIO ADMIN DA EMPRESA
    const newUser = await authService.registerUserAdmin(
      body.adminUser,
      newCompany.id,
    );

    //PROCURANDO A ROLE ADMIN NO BANCO DE DADOS
    const roleAdmin = await authService.findAdminRole();

    if (!roleAdmin) {
      return response
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: RESPONSE_MESSAGE.ROLE_NOT_FOUND });
    }

    //VINCULADO A ROLE ADMIN AO NOVO USUARIO
    await authService.addRoleAdminUser(newUser.id, roleAdmin.id);

    await sendMail({
      name: newCompany.name,
      address: newUser.email,
      code: newCompany.code_register_validation!,
      path: 'auth/validate-registration',
      subject: 'Validação de E-mail',
      host: backendUrl!,
    });

    return response.status(STATUS_CODE.CREATED).json({
      message: RESPONSE_MESSAGE.CREATED_SUCCESSFULLY,
    });
  } catch (error: any) {
    console.log(error);

    if (error.message.includes('CNPJ já cadastrado')) {
      return response.status(STATUS_CODE.BAD_REQUEST).json({
        message: RESPONSE_MESSAGE.CNPJ_EXISTS,
      });
    }

    if (error.message.includes('Telefone já cadastrado')) {
      return response.status(STATUS_CODE.BAD_REQUEST).json({
        message: RESPONSE_MESSAGE.PHONE_EXISTS,
      });
    }

    if (error.message.includes('Email já cadastrado')) {
      return response.status(STATUS_CODE.BAD_REQUEST).json({
        message: RESPONSE_MESSAGE.EMAIL_EXISTS,
      });
    }

    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

export default { login, registerCompany, validateCompany };
