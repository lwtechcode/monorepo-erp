import { Request, Response } from 'express';
import { RESPONSE_MESSAGE } from '../constants/response-messages';
import { STATUS_CODE } from '../constants/status-code';
import supplierService from '../services/supplier.service';

import { SupplierDTO } from '../dto/supplier.dto';

async function create(request: Request, response: Response) {
  const body: SupplierDTO = request.body;

  try {
    const data = await supplierService.create({
      ...body,
      company_id: request.company_id,
    });

    return response
      .status(STATUS_CODE.CREATED)
      .json({ message: 'Fornecedor criado com sucesso', id: data.id });
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
    nameOrCNPJ = '',
    status = '',
    orderBy = '',
  } = request.query;

  const company_id = request.company_id;

  try {
    const data = await supplierService.findAll({
      page: Number(page),
      pageSize: Number(pageSize),
      nameOrCNPJ: String(nameOrCNPJ),
      companyId: company_id,
      status: String(status),
      orderBy: String(orderBy),
    });

    return response.status(STATUS_CODE.OK).json(data);
  } catch (error) {
    console.log(error);
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

async function update(request: Request, response: Response) {
  const { id } = request.params as { id: string };
  const company_id = request.company_id;

  const body: SupplierDTO = request.body;

  if (!id) {
    return response
      .status(STATUS_CODE.BAD_GATEWAY)
      .json({ message: RESPONSE_MESSAGE.PROVIDE_RECORD_ID });
  }

  try {
    const supplier = await supplierService.findById({
      id,
      companyId: company_id,
    });

    if (!supplier) {
      return response.status(404).json({ message: RESPONSE_MESSAGE.NOT_FOUND });
    }

    const dataEdited = await supplierService.update(id, body, company_id);

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
    const data = await supplierService.findAllOptions(company_id);

    return response.status(STATUS_CODE.OK).json(data);
  } catch (error) {
    console.log(error);
    return response.status(STATUS_CODE.SERVICE_UNAVAILABLE).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error,
    });
  }
}

async function generatePDF(request: Request, response: Response) {
  try {
    const { nameOrCNPJ = '', status = '', orderBy = '' } = request.query;

    const company_id = request.company_id;

    const suppliers = await supplierService.findAllToReport({
      nameOrCnpj: String(nameOrCNPJ),
      companyId: company_id,
      status: String(status),
      orderBy: String(orderBy),
    });

    const pdfDoc = await supplierService.generatePDF(suppliers.suppliers);

    const chunks: Buffer[] = [];

    pdfDoc.on('data', (chunk) => {
      chunks.push(chunk);
    });

    pdfDoc.end();

    pdfDoc.on('end', () => {
      const result = Buffer.concat(chunks);
      response.setHeader('Content-Type', 'application/pdf');
      response.setHeader(
        'Content-Disposition',
        'attachment; filename="RelatorioFornecedores.pdf"',
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

export default { create, findAll, update, findAllOptions, generatePDF };
