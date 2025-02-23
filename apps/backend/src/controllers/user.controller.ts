import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { RESPONSE_MESSAGE } from "../constants/response-messages";
import { STATUS_CODE } from "../constants/status-code";
import { UserDTO } from "../dto/user.dto";
import userService from "../services/user.service";
import companyService from "../services/company.service";

async function create(request: Request, response: Response) {
  const body: UserDTO = request.body;

  try {
    const companyExists = await companyService.findById(request.company_id);

    if (!companyExists) {
      return response
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: "ID da empresa não encontrado" });
    }

    const emailExists = await userService.findByEmail({
      email: body.email,
      company_id: request.company_id,
    });

    if (emailExists) {
      return response
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: `O e-mail ${body.email} já está sendo usado` });
    }

    body.password = bcrypt.hashSync(body.password, 10);

    const data = await userService.create({
      ...body,
      company_id: "clvtlv70e000058bjyux9ynsx",
    });

    return response
      .status(STATUS_CODE.CREATED)
      .json({ message: "Usuário criado com sucesso", id: data.id });
  } catch (error) {
    console.log(error);
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

export default { create };
