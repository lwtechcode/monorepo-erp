import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { prisma } from '../database/prisma';
import { SaleBudgetDTO } from '../dto/sale-budget.dto';
import { getAtualDateWithHours } from '../utils/date.util';
import { formatMoney } from '../utils/formatters';

async function create(
  data: SaleBudgetDTO & {
    companyId: string;
    total_value?: number;
    tax_payment_value?: number;
  },
) {
  return prisma.salesBudget.create({
    data: {
      client_id: data.client_id,
      company_id: data.companyId,
      payment_method_id: data.payment_method_id,
      discount_value: data.discount_value,
      increase_value: data.increase_value,
      tax_payment_value: data.tax_payment_value,
      total_value: data.total_value,
      observation: data.observation,
    },
  });
}

async function findAll({
  company_id,
  page,
  pageSize,
}: {
  company_id: string;
  page: number;
  pageSize: number;
}) {
  const where: any = {
    // OR: [
    // { name: { contains: nameOrCNPJ } },
    // { cnpj: { contains: nameOrCNPJ } },
    // ],
  };

  if (company_id) {
    Object.assign(where, { company_id });
  }

  const totalCount = await prisma.salesBudget.count({ where });
  const totalPages = Math.ceil(totalCount / pageSize);
  const skip = (page - 1) * pageSize;

  const salesBudgets = await prisma.salesBudget.findMany({
    where,
    skip,
    take: pageSize,
    include: {
      client: {
        select: {
          name: true,
          cpf: true,
        },
      },
      payment: {
        select: {
          name: true,
        },
      },
      ProductSaleBudget: {
        select: {
          name: true,
          id: true,
          discounted_price: true,
          original_price: true,
          qty: true,
          product_id: true,
        },
      },
    },
  });

  return {
    salesBudgets,
    totalCount,
    totalPages,
  };
}

async function findById({
  company_id,
  id,
}: {
  company_id: string;
  id: string;
}) {
  const sale_budget = await prisma.salesBudget.findFirst({
    where: { company_id, id },
    include: {
      client: {
        select: {
          name: true,
          cpf: true,
        },
      },
      payment: {
        select: {
          name: true,
        },
      },
      ProductSaleBudget: {
        select: {
          name: true,
          id: true,
          discounted_price: true,
          original_price: true,
          qty: true,
          product_id: true,
        },
      },
    },
  });

  if (sale_budget) {
    const { ProductSaleBudget, ...rest } = sale_budget as any;
    return { ...rest, products_sale_budgets: ProductSaleBudget };
  }

  return sale_budget;
}

async function remove({ company_id, id }: { company_id: string; id: string }) {
  return prisma.salesBudget.update({
    where: { id: id, company_id: company_id },
    data: {
      active: false,
    },
  });
}

const fonts = {
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
  },
};

async function generateCoupon({
  id,
  company_id,
}: {
  id: string;
  company_id: string;
}): Promise<any> {
  try {
    const printer = new PdfPrinter(fonts);

    const saleBudget = await findById({ company_id, id });

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: {
        font: 'Helvetica',
      },
      pageOrientation: 'portrait',
      pageMargins: [20, 20, 20, 20],
      footer: function (currentPage, pageCount) {
        return {
          text: `${currentPage.toString()} / ${pageCount}`,
          alignment: 'right',
          style: {
            fontSize: 7,
          },
          margin: [0, 0, 20, 0],
        };
      },
      content: [
        {
          columns: [
            { text: 'ORÇAMENTO', style: 'header', width: '*' },
            { text: getAtualDateWithHours(), style: 'header', width: 'auto' },
          ],
        },
        {
          text: 'NOME DA LOJA'.toUpperCase(),
          style: 'centeredTextTitle',
          margin: [0, 10, 0, 3],
        },
        {
          text: 'CNPJ: 77.333.970/0001-33',
          style: 'centeredText',
          margin: [0, 0, 0, 3],
        },
        {
          text: 'Rua Jovito Batista, 230, Vila Serranópolis, 39520-000',
          style: 'centeredText',
          margin: [0, 0, 0, 3],
        },
        {
          text: 'Porteirinha - MG',
          style: 'centeredText',
          margin: [0, 0, 0, 3],
        },
        {
          text: 'Fone: (38) 98848-5170',
          style: 'centeredText',
          margin: [0, 0, 0, 5],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 575 - 20,
              y2: 0,
              lineWidth: 0.5,
              lineColor: 'black',
            },
          ],
          margin: [0, 10, 0, 10],
        },
        {
          text: 'Dados do Cliente'.toUpperCase(),
          style: 'title',
          margin: [0, 2, 0, 5],
        },
        {
          columns: [
            {
              text: 'Nome:',
              style: 'title',
              width: '10%',
            },
            {
              text:
                saleBudget?.client?.name || 'Cliente não informado na venda',
              style: 'clientData',
              width: '80%',
            },
          ],
          margin: [0, 1, 0, 2],
        },
        {
          columns: [
            {
              text: 'CPF:',
              style: 'title',
              width: '10%',
            },
            {
              text: saleBudget?.client?.cpf || '---',
              style: 'clientData',
              width: '80%',
            },
          ],
          margin: [0, 1, 0, 2],
        },

        {
          text: 'PRODUTOS'.toUpperCase(),
          style: 'centeredTextTitle',
          margin: [0, 5, 0, 5],
        },
        {
          table: {
            widths: [20, '*', 30, 90, 90],
            body: [
              [
                { text: 'Ord.'.toUpperCase(), style: 'headerCentered' },
                { text: 'Descrição'.toUpperCase(), style: 'headerCentered' },
                { text: 'Qtd.'.toUpperCase(), style: 'headerCentered' },
                {
                  text: 'Preço Unitário'.toUpperCase(),
                  style: 'headerCentered',
                },
                { text: 'Preço Total'.toUpperCase(), style: 'headerCentered' },
              ],
              ...saleBudget?.products_sale_budgets?.map(
                (item: any, index: number) => [
                  { text: index + 1, style: 'cellCode' },
                  { text: item.name, style: 'cellDescription' },
                  { text: item.qty.toString(), style: 'cellCode' },
                  {
                    text: `${formatMoney(Number(item.discounted_price))}`,
                    style: 'cellPrice',
                  },
                  {
                    text: `${formatMoney(item.discounted_price * item.qty)}`,
                    style: 'cellPrice',
                  },
                ],
              ),
            ],
          },
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            widths: [50, '*', 50, 90, 90],
            body: [
              [
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: 'TOTAL', style: 'tableFooter' },
                {
                  text: `${formatMoney(Number(saleBudget.total_value))}`,
                  style: 'tableFooterText',
                },
              ],
              [
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: 'FORMA DE PGTO.', style: 'tableFooter' },
                { text: saleBudget?.payment?.name, style: 'tableFooterText' },
              ],
              [
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: 'DESCONTOS', style: 'tableFooter' },
                {
                  text: `${formatMoney(Number(saleBudget?.discount_value))}`,
                  style: 'tableFooterText',
                },
              ],
              [
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: 'ACRÉSCIMOS', style: 'tableFooter' },
                {
                  text: `${formatMoney(Number(saleBudget?.increase_value))}`,
                  style: 'tableFooterText',
                },
              ],
              [
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: 'SUB-TOTAL', style: 'tableFooter' },
                {
                  text: `${formatMoney(Number(saleBudget?.total_value) + Number(saleBudget?.increase_value) - Number(saleBudget?.discount_value))}`,
                  style: 'tableFooterText',
                },
              ],
            ],
          },
          margin: [0, 0, 0, 10],
        },

        {
          text: 'Aguardamos sua compra!',
          style: 'centeredText',
          margin: [0, 20, 0, 10],
        },

        {
          text: 'Orçamento válido por 7 dias.',
          style: 'centeredTextSmall',
          margin: [0, 0, 0, 10],
        },
      ],
      styles: styles,
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinitions);

    return pdfDoc;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const styles: any = {
  header: {
    fontSize: 9,
    bold: true,
    font: 'Helvetica',
  },
  text: {
    fontSize: 9,
    font: 'Helvetica',
  },
  headerCentered: {
    margin: [0, 1, 0, 1],
    fontSize: 8,
    bold: true,
    alignment: 'center',
    font: 'Helvetica',
  },
  cellCode: {
    margin: [0, 1, 0, 1],
    fontSize: 8,
    alignment: 'center',
    font: 'Helvetica',
  },
  cellDescription: {
    margin: [0, 1, 0, 1],
    fontSize: 8,
    alignment: 'left',
    font: 'Helvetica',
  },
  cellPrice: {
    margin: [0, 1, 0, 1],
    fontSize: 8,
    alignment: 'right',
    font: 'Helvetica',
  },
  centeredTextTitle: {
    fontSize: 9,
    bold: true,
    alignment: 'center',
    font: 'Helvetica',
  },
  centeredText: {
    alignment: 'center',
    fontSize: 9,
    font: 'Helvetica',
  },
  centeredTextSmall: {
    alignment: 'center',
    fontSize: 8,
    font: 'Helvetica',
  },
  title: {
    fontSize: 9,
    bold: true,
    font: 'Helvetica',
  },
  clientData: {
    fontSize: 9,
    alignment: 'left',
    margin: [0, 0, 0, 2],
    font: 'Helvetica',
  },
  tableHeader: {
    fontSize: 9,
    bold: true,
    alignment: 'left',
    fillColor: '#f0f0f0',
    font: 'Helvetica',
  },
  tableData: {
    fontSize: 9,
    alignment: 'left',
    font: 'Helvetica',
  },
  tableFooter: {
    fontSize: 8,
    bold: true,
    alignment: 'right',
    font: 'Helvetica',
  },
  tableFooterText: {
    fontSize: 8,
    alignment: 'right',
    font: 'Helvetica',
  },
  fontSmall: {
    fontSize: 6,
    bold: true,
    alignment: 'center',
    font: 'Helvetica',
  },
};

export default { create, findAll, findById, generateCoupon, remove };
