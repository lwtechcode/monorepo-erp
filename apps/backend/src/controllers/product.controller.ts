import { Request, Response } from 'express';
import { RESPONSE_MESSAGE } from '../constants/response-messages';
import { STATUS_CODE } from '../constants/status-code';
import { ProductDTO } from '../dto/product.dto';
import productCategoryService from '../services/product-category.service';
import productService from '../services/product.service';
import supplierService from '../services/supplier.service';

async function create(request: Request, response: Response) {
  const body: ProductDTO = request.body;
  try {
    if (body.supplier_id) {
      const suppliersExists = await supplierService.findById({
        companyId: request.company_id,
        id: body.supplier_id,
      });

      if (!suppliersExists) {
        return response
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ message: 'Fornecedor não encontrado' });
      }
    }

    if (body.product_category_id) {
      const suppliersExists = await productCategoryService.findById({
        companyId: request.company_id,
        id: body.product_category_id,
      });

      if (!suppliersExists) {
        return response
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ message: 'Categoria não encontrada' });
      }
    }

    const data = await productService.create({
      ...body,
      companyId: request.company_id,
    });

    return response
      .status(STATUS_CODE.CREATED)
      .json({ message: 'Produto criado com sucesso', id: data.id });
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
  const companyId = request.company_id;

  const body: ProductDTO = request.body;

  if (!id) {
    return response
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: RESPONSE_MESSAGE.PROVIDE_RECORD_ID });
  }

  try {
    const product = await productService.findById({ id, companyId });

    if (body.supplier_id) {
      const suppliersExists = await supplierService.findById({
        companyId: request.company_id,
        id: body.supplier_id,
      });

      if (!suppliersExists) {
        return response
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ message: 'Fornecedor não encontrado' });
      }
    }

    if (body.product_category_id) {
      const suppliersExists = await productCategoryService.findById({
        companyId: request.company_id,
        id: body.product_category_id,
      });

      if (!suppliersExists) {
        return response
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ message: 'Categoria não encontrada' });
      }
    }

    if (!product) {
      return response
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: RESPONSE_MESSAGE.NOT_FOUND });
    }

    const productCategoryExists = await productCategoryService.findById({
      id: body.product_category_id,
      companyId,
    });

    if (!productCategoryExists) {
      return response
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: 'Categoria não encontrado' });
    }

    const productEdited = await productService.update({
      companyId,
      data: body,
      productId: id,
    });

    return response.status(STATUS_CODE.OK).json({
      message: RESPONSE_MESSAGE.UPDATED_SUCCESSFULLY,
      id: productEdited.id,
    });
  } catch (error) {
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
    nameOrBarCodeOrSKU = '',
    status = '',
    orderBy = '',
    category = '',
    discount,
  } = request.query;

  const companyId = request.company_id;

  try {
    const data = await productService.findAll({
      page: Number(page),
      pageSize: Number(pageSize),
      nameOrBarCodeOrSKU: String(nameOrBarCodeOrSKU),
      companyId,
      status: String(status),
      orderBy: String(orderBy),
      discount: discount === 'true',
      category: String(category),
    });

    // return response.send();
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
    const { nameOrBarCode = '', status = '', orderBy = '' } = request.query;

    const company_id = request.company_id;

    const products = await productService.findAllToReport({
      nameOrBarCode: String(nameOrBarCode),
      companyId: company_id,
      status: String(status),
      orderBy: String(orderBy),
    });

    const pdfDoc = await productService.generatePDF(products.products);

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
        'attachment; filename="RelatorioProdutos.pdf"',
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

export default { create, findAll, update, generatePDF };
