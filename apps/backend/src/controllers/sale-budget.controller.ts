import { Request, Response } from 'express';
import { RESPONSE_MESSAGE } from '../constants/response-messages';
import { STATUS_CODE } from '../constants/status-code';
import saleService from '../services/sale.service';

import { SaleBudgetDTO } from '../dto/sale-budget.dto';
import clientService from '../services/client.service';
import paymentMethodService from '../services/payment-method.service';
import productSaleBudgetService from '../services/product-sale-budget.service';
import { ProductEntity } from '../services/product-sale.service';
import productService from '../services/product.service';
import saleBudgetService from '../services/sale-budget.service';

async function create(request: Request, response: Response) {
  const body: SaleBudgetDTO = request.body;

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
    const saleBudget = await saleBudgetService.create({
      companyId: request.company_id,
      discount_value: body.discount_value || 0,
      increase_value: body.increase_value || 0,
      payment_method_id: body.payment_method_id,
      client_id: body.client_id,
      total_value: PRODUCTS_TOTAL,
      tax_payment_value:
        (PRODUCTS_TOTAL * (Number(paymentMethodExists.tax) || 0)) / 100,
      products: [],
    });

    // Relacionar os produtos à venda
    await Promise.all(
      productsMounted.map(async (item) => {
        await productSaleBudgetService.create({
          company_id: request.company_id,
          discounted_price: item.discounted_price,
          name: item.name,
          original_price: item.original_price,
          product_id: item.product_id,
          qty: item.qty,
          sales_budget_id: saleBudget.id,
          id: '',
        });
      }),
    );

    return response
      .status(STATUS_CODE.CREATED)
      .json({ message: 'Orçamento salvo com sucesso', id: saleBudget.id });
  } catch (error: any) {
    console.error(error);
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: RESPONSE_MESSAGE.OPERATION_FAILED,
      error: error.message || error,
    });
  }
}

async function findAll(request: Request, response: Response) {
  const { page = 1, pageSize = 10 } = request.query;

  const company_id = request.company_id;

  try {
    const data = await saleBudgetService.findAll({
      company_id,
      page: Number(page),
      pageSize: Number(pageSize),
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
    const data = await saleBudgetService.findById({
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

async function remove(request: Request, response: Response) {
  const { id } = request.params;

  const company_id = request.company_id;

  try {
    const data = await saleBudgetService.findById({
      company_id,
      id,
    });

    if (!data) {
      return response
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: RESPONSE_MESSAGE.NOT_FOUND });
    }

    await saleBudgetService.remove({ company_id, id });

    return response
      .status(STATUS_CODE.OK)
      .json({ message: RESPONSE_MESSAGE.DELETED_SUCCESSFULLY });
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

    const pdfDoc = await saleBudgetService.generateCoupon({ id, company_id });

    const chunks: Buffer[] = [];

    pdfDoc.on('data', (chunk: any) => {
      chunks.push(chunk);
    });

    pdfDoc.end();

    pdfDoc.on('end', () => {
      const result = Buffer.concat(chunks);
      response.setHeader('Content-Type', 'application/pdf');
      response.setHeader(
        'Content-Disposition',
        'attachment; filename="RelatorioClientes.pdf"',
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
  findById,
  generateCoupon,
  remove,
};
