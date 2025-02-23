import { Request, Response } from 'express';
import { RESPONSE_MESSAGE } from '../constants/response-messages';
import { STATUS_CODE } from '../constants/status-code';
import { UnitOfMeasurementDTO } from '../dto/unit-of-measurement.dto';
import unitOfMeasurementService from '../services/unit-of-measurement.service';

async function create(request: Request, response: Response) {
  const body: UnitOfMeasurementDTO = request.body;

  const company_id = request.company_id;

  try {
    const newData = await unitOfMeasurementService.create({
      ...body,
      abbreviation: body.abbreviation,
      company_id,
    });

    return response.status(STATUS_CODE.CREATED).json({
      message: RESPONSE_MESSAGE.CREATED_SUCCESSFULLY,
      id: newData.id,
    });
  } catch (error) {
    return response.status(STATUS_CODE.SERVICE_UNAVAILABLE).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

async function findAll(request: Request, response: Response) {
  const { page = 1, pageSize = 10, nameOrAbbreviation = '' } = request.query;

  const company_id = request.company_id;

  try {
    const data = await unitOfMeasurementService.findAll({
      page: Number(page),
      pageSize: Number(pageSize),
      nameOrAbbreviation: String(nameOrAbbreviation),
      companyId: company_id,
    });

    return response.status(STATUS_CODE.OK).json(data);
  } catch (error) {
    console.log(error);
    return response.status(STATUS_CODE.SERVICE_UNAVAILABLE).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

async function update(request: Request, response: Response) {
  const { id } = request.params as { id: string };
  const companyId = request.company_id;

  const body: UnitOfMeasurementDTO = request.body;

  if (!id) {
    return response
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: RESPONSE_MESSAGE.PROVIDE_RECORD_ID });
  }

  try {
    const data = await unitOfMeasurementService.findById({
      id,
      companyId,
    });

    if (!data) {
      return response
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: RESPONSE_MESSAGE.NOT_FOUND });
    }

    const dataEdited = await unitOfMeasurementService.update({
      companyId,
      data: body,
      unitOfMeasurementId: id,
    });

    return response.status(STATUS_CODE.OK).json({
      message: RESPONSE_MESSAGE.UPDATED_SUCCESSFULLY,
      id: dataEdited.id,
    });
  } catch (error) {
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

async function findAllOptions(request: Request, response: Response) {
  const company_id = request.company_id;

  try {
    const data = await unitOfMeasurementService.findAllOptions(company_id);

    return response.status(STATUS_CODE.OK).json(data);
  } catch (error) {
    console.log(error);
    return response.status(STATUS_CODE.SERVICE_UNAVAILABLE).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

export default {
  create,
  findAll,
  update,
  findAllOptions,
};
