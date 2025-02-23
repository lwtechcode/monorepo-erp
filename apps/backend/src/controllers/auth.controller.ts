import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { LoginDTO, RegisterDTO } from '../dto/auth.dto';
import authService from '../services/auth.service';
import { STATUS_CODE } from '../constants/status-code';
import { RESPONSE_MESSAGE } from '../constants/response-messages';
import jtwUtils from '../utils/jtw.util';
import companyService from '../services/company.service';
import userService from '../services/user.service';

export async function login(request: Request, response: Response) {
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
      return response
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: RESPONSE_MESSAGE.INVALID_LOGIN_DATA });
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

export async function register(request: Request, response: Response) {
  try {
    const body: RegisterDTO = request.body;

    const userExists = await authService.findByEmail(body.email);

    if (userExists) {
      return response
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: RESPONSE_MESSAGE.EMAIL_EXISTS });
    }

    const companyCreated = await companyService.create({
      name: body.company_name,
      active: true,
    });

    const hashedPassword = bcrypt.hashSync(body.password, 10);

    const userCreated = await userService.create({
      active: true,
      company_id: companyCreated.id,
      email: body.email,
      name: body.name,
      password: hashedPassword,
      phone: body.phone,
    });

    return response.status(STATUS_CODE.OK).json({
      name: userCreated.name,
      email: userCreated.email,
      token: jtwUtils.assignToken({ company_id: userCreated.company_id }),
    });
  } catch (error) {
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

export default { login, register };
