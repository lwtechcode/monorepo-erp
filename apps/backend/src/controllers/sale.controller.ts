import { Request, Response } from 'express';
import { RESPONSE_MESSAGE } from '../constants/response-messages';
import { STATUS_CODE } from '../constants/status-code';
import saleService from '../services/sale.service';

import { SaleDTO } from '../dto/sale.dto';
import clientService from '../services/client.service';
import paymentMethodService from '../services/payment-method.service';
import productSaleService, {
  ProductEntity,
} from '../services/product-sale.service';
import productService from '../services/product.service';

enum SALE_STATUS {
  CONCLUIDA = 1,
  CANCELADA = 2,
}

async function create(request: Request, response: Response) {
  const body: SaleDTO = request.body;

  try {
    // Verificar a existência do cliente, se fornecido
    if (body.client_id) {
      const clientExists = await clientService.findById({
        id: body.client_id,
        companyId: request.company_id,
      });

      if (!clientExists) {
        return response
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ message: 'Cliente não encontrado' });
      }
    }

    // Verificar a existência do método de pagamento
    const paymentMethodExists = await paymentMethodService.findById({
      id: body.payment_method_id,
      companyId: request.company_id,
    });

    if (!paymentMethodExists) {
      return response
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: 'Método de pagamento não encontrado' });
    }

    // Montar a lista de produtos
    const productsMounted: ProductEntity[] = await Promise.all(
      body?.products.map(async (item) => {
        // Verificar a existência do produto
        const product = await productService.findById({
          companyId: request.company_id,
          id: item.id,
        });

        if (!product) {
          throw new Error(`Produto com o id ${item.id} não foi encontrado`);
        }

        // Retornar o produto montado
        return {
          name: product.name,
          original_price: Number(product.sale_price),
          discounted_price: item.discounted_price || Number(product.sale_price),
          company_id: request.company_id,
          product_id: product.id,
          qty: item.qty,
          sale_id: '',
          id: '',
        };
      }),
    );

    // Calcular o valor total dos produtos
    const PRODUCTS_TOTAL = productsMounted.reduce(
      (acc, product) => product.qty * product.discounted_price + acc,
      0,
    );

    // Criar a venda
    const sale = await saleService.create({
      companyId: request.company_id,
      discount_value: body.discount_value || 0,
      increase_value: body.increase_value || 0,
      payment_method_id: body.payment_method_id,
      status: SALE_STATUS.CONCLUIDA,
      client_id: body.client_id,
      total_value: PRODUCTS_TOTAL,
      tax_payment_value:
        (PRODUCTS_TOTAL * (Number(paymentMethodExists.tax) || 0)) / 100,
      products: [],
    });

    // Relacionar os produtos à venda
    await Promise.all(
      productsMounted.map(async (item) => {
        await productSaleService.create({
          company_id: request.company_id,
          discounted_price: item.discounted_price,
          name: item.name,
          original_price: item.original_price,
          product_id: item.product_id,
          qty: item.qty,
          sale_id: sale.id,
          id: '',
        });
      }),
    );

    return response
      .status(STATUS_CODE.CREATED)
      .json({ message: 'Venda concluída com sucesso', id: sale.id });
  } catch (error: any) {
    console.error(error);
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error: error.message || error,
    });
  }
}

async function findAll(request: Request, response: Response) {
  const {
    page = 1,
    pageSize = 10,
    nameOrCPF = "",
    status = undefined,
    orderBy = "",
    startDate = "",
    endDate = "",
  } = request.query;

  const company_id = request.company_id;

  try {
    const data = await saleService.findAll({
      company_id,
      page: Number(page),
      pageSize: Number(pageSize),
      nameOrCPF: String(nameOrCPF),
      status: status ? Number(status) : undefined,
      orderBy: String(orderBy),
      startDate: String(startDate),
      endDate: String(endDate)
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

async function findById(request: Request, response: Response) {
  const { id } = request.params;

  const company_id = request.company_id;

  try {
    const data = await saleService.findById({
      company_id,
      id,
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

async function generateCoupon(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const company_id = request.company_id;

    const pdfDoc = await saleService.generateCoupon({ id, company_id });

    const chunks: Buffer[] = [];

    pdfDoc.on('data', (chunk: any) => {
      chunks.push(chunk);
    });

    pdfDoc.end();

    pdfDoc.on('end', () => {
      const result = Buffer.concat(chunks);
      const base64String = result.toString('base64'); // Converte o buffer para base64

      response.setHeader('Content-Type', 'text/plain'); // Define o tipo de conteúdo como texto
      response.setHeader(
        'Content-Disposition',
        'attachment; filename="RelatorioClientes.txt"', // Nome do arquivo .txt
      );

      return response.end(base64String); // Envia a string base64 como resposta
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
  findById,
  generateCoupon,
};
