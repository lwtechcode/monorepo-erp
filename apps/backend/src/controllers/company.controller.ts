import { Request, Response } from "express";
import { CompanyDTO } from "../dto/company.dto";
import companyService from "../services/company.service";
import { STATUS_CODE } from "../constants/status-code";
import { RESPONSE_MESSAGE } from "../constants/response-messages";

async function create(request: Request, response: Response) {
  const body: CompanyDTO = request.body;

  try {
    const company = await companyService.create(body);

    return response
      .status(STATUS_CODE.CREATED)
      .json({ message: "Empresa criada com sucesso", id: company.id });
  } catch (error) {
    console.log(error);
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

export default { create };
