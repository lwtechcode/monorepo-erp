import { Request, Response } from 'express';
import { PaymentMethodDTO } from '../dto/payment-method.dto';
import paymentMethodService from '../services/payment-method.service';
import { STATUS_CODE } from '../constants/status-code';
import { RESPONSE_MESSAGE } from '../constants/response-messages';

async function create(request: Request, response: Response) {
  const body: PaymentMethodDTO = request.body;

  const company_id = request.company_id;

  try {
    const newPaymentMethod = await paymentMethodService.create({
      ...body,
      company_id,
    });

    return response.status(STATUS_CODE.CREATED).json({
      message: RESPONSE_MESSAGE.CREATED_SUCCESSFULLY,
      id: newPaymentMethod.id,
    });
  } catch (error) {
    return response.status(STATUS_CODE.SERVICE_UNAVAILABLE).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

export async function findAll(request: Request, response: Response) {
  const { page = 1, pageSize = 10, name = '' } = request.query;

  const company_id = request.company_id;

  try {
    const data = await paymentMethodService.findAll({
      page: Number(page),
      pageSize: Number(pageSize),
      name: String(name),
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

export async function update(request: Request, response: Response) {
  const { id } = request.params as { id: string };
  const companyId = request.company_id;

  const body: PaymentMethodDTO = request.body;

  if (!id) {
    return response
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: RESPONSE_MESSAGE.PROVIDE_RECORD_ID });
  }

  try {
    const paymentMethod = await paymentMethodService.findById({
      id,
      companyId,
    });

    if (!paymentMethod) {
      return response
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: RESPONSE_MESSAGE.NOT_FOUND });
    }

    const paymentMethodEdited = await paymentMethodService.update({
      companyId,
      data: body,
      paymentId: id,
    });

    return response.status(STATUS_CODE.OK).json({
      message: RESPONSE_MESSAGE.UPDATED_SUCCESSFULLY,
      id: paymentMethodEdited.id,
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
    const data = await paymentMethodService.findAllOptions(company_id);

    return response.status(STATUS_CODE.OK).json(data);
  } catch (error) {
    console.log(error);
    return response.status(STATUS_CODE.SERVICE_UNAVAILABLE).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

export default { create, findAll, update, findAllOptions };
