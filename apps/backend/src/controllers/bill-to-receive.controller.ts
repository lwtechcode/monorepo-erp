import {
  getDate,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  isEqual,
} from "date-fns";
import { Request, Response } from "express";
import { RESPONSE_MESSAGE } from "../constants/response-messages";
import { STATUS_CODE } from "../constants/status-code";
import { BillToReceiveDTO } from "../dto/bill-to-receive.dto";
import billToReceiveService from "../services/bill-to-receive.service";
import clientService from "../services/client.service";
import { paymentStatusEnum } from "../enum/status";

type RequestQueryGetAll = {
  page: number;
  pageSize: number;
  userCompanyId: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
};

function getCurrentDate() {
  const YEAR = getYear(new Date());
  const MONTH = (getMonth(new Date()) + 1).toString().padStart(2, "0");
  const DAY = getDate(new Date()).toString().padStart(2, "0");

  return `${YEAR}-${MONTH}-${DAY}`;
}

function generateStatus(due_date: Date, pay_date?: Date | null) {
  const currentDate = getCurrentDate();
  const dueDateOnly = due_date;

  if (
    (pay_date && isEqual(dueDateOnly, pay_date)) ||
    (pay_date && isBefore(pay_date, due_date))
  ) {
    return paymentStatusEnum.RECEBIDA;
  }

  if (!pay_date && isBefore(dueDateOnly, currentDate)) {
    return paymentStatusEnum.ATRASADA;
  }

  if (isAfter(dueDateOnly, currentDate) || isEqual(dueDateOnly, currentDate)) {
    return paymentStatusEnum.EM_DIA;
  }

  if (pay_date && isAfter(pay_date, due_date)) {
    return paymentStatusEnum.RECEBIDA_COM_ATRASO;
  }

  throw new Error("Status da conta não pode ser definido");
}

async function create(request: Request, response: Response) {
  const body: BillToReceiveDTO = request.body;

  try {
    const clientExists = await clientService.findById({
      companyId: request.company_id,
      id: body.client_id,
    });

    if (!clientExists) {
      return response
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: "Cliente não encontrado" });
    }

    const data = await billToReceiveService.create({
      ...body,
      companyId: request.company_id,
      status: generateStatus(body.due_date, body.receipt_date),
    });

    return response
      .status(STATUS_CODE.CREATED)
      .json({ message: "Conta a receber criada com sucesso", id: data.id });
  } catch (error) {
    console.log(error);
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

async function findAll(request: Request, response: Response) {
  const {
    page = 1,
    pageSize = 10,
    endDate,
    startDate,
    status,
    description,
  } = request.query as unknown as RequestQueryGetAll;

  const companyId = request.company_id;

  try {
    const data = await billToReceiveService.findAllPaginated({
      page: Number(page),
      pageSize: Number(pageSize),
      endDate: endDate,
      startDate: startDate,
      status: status,
      companyId,
      description: description,
    });

    return response.status(STATUS_CODE.OK).json(data);
  } catch (error) {
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

async function update(request: Request, response: Response) {
  const { id } = request.params as { id: string };
  const companyId = request.company_id;

  const body: BillToReceiveDTO = request.body;

  if (!id) {
    return response
      .status(STATUS_CODE.BAD_GATEWAY)
      .json({ message: "Informe o ID da conta a pagar" });
  }

  try {
    const bill = await billToReceiveService.findById({ id, companyId });

    if (!bill) {
      return response
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: RESPONSE_MESSAGE.NOT_FOUND });
    }

    const clientExists = await clientService.findById({
      companyId,
      id: body.client_id,
    });

    if (!clientExists) {
      return response
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "Cliente não encontrado" });
    }

    const statusVerified = generateStatus(body.due_date, body.receipt_date);

    const billToPay = await billToReceiveService.update({
      billToReceiveId: id,
      companyId,
      data: { ...body, status: statusVerified },
    });

    return response.status(STATUS_CODE.OK).json({
      message: RESPONSE_MESSAGE.UPDATED_SUCCESSFULLY,
      id: billToPay.id,
    });
  } catch (error) {
    console.log(error);
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

async function remove(request: Request, response: Response) {
  const { id } = request.params;
  const companyId = request.company_id;

  try {
    const billToReceive = await billToReceiveService.findById({
      id,
      companyId,
    });

    if (!billToReceive) {
      return response
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: RESPONSE_MESSAGE.NOT_FOUND });
    }

    await billToReceiveService.remove({
      id,
      companyId,
    });

    return response
      .status(STATUS_CODE.OK)
      .json({ message: RESPONSE_MESSAGE.DELETED_SUCCESSFULLY });
  } catch (error) {
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

async function changeStatus(_: Request, response: Response) {
  try {
    const billsToReceive = await billToReceiveService.findAll({
      status: paymentStatusEnum.EM_DIA,
    });

    const ids: string[] = [];

    billsToReceive.forEach(async (bill) => {
      const statusVerified = generateStatus(bill.due_date, bill.receipt_date);

      if (statusVerified === paymentStatusEnum.ATRASADA) {
        ids.push(bill.id);
      }
    });

    if (ids.length > 0) {
      await billToReceiveService.updateStatus({ ids });
    }

    return response.status(STATUS_CODE.OK).json({ message: "ok" });
  } catch (error) {
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

async function generatePDF(request: Request, response: Response) {
  try {
    const {
      nameOrCPF = "",
      status = "",
      orderBy = "",
      endDate = "",
      startDate = "",
    } = request.query;

    const company_id = request.company_id;

    const data = await billToReceiveService.findAllToReport({
      description: String(nameOrCPF),
      companyId: company_id,
      status: String(status),
      orderBy: String(orderBy),
      endDate: String(endDate),
      startDate: String(startDate),
    });

    const pdfDoc = await billToReceiveService.generatePDF(data.billsToReceive);

    const chunks: Buffer[] = [];

    pdfDoc.on("data", (chunk) => {
      chunks.push(chunk);
    });

    pdfDoc.end();

    pdfDoc.on("end", () => {
      const result = Buffer.concat(chunks);
      response.setHeader("Content-Type", "application/pdf");
      response.setHeader(
        "Content-Disposition",
        'attachment; filename="RelatorioContasPagar.pdf"'
      );
      return response.end(result);
    });
  } catch (error) {
    console.log(error);
    response
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send(RESPONSE_MESSAGE.OPERATION_FAILED);
  }
}

export default {
  create,
  findAll,
  update,
  remove,
  changeStatus,
  generatePDF,
};
