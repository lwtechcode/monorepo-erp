import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { prisma } from '../database/prisma';
import { SaleDTO } from '../dto/sale.dto';
import { getAtualDateWithHours } from '../utils/date.util';
import { formatMoney } from '../utils/formatters';

async function create(
  data: SaleDTO & {
    companyId: string;
    status: number;
    total_value?: number;
    tax_payment_value?: number;
  },
) {
  return prisma.sale.create({
    data: {
      status: data.status,
      client_id: data.client_id,
      company_id: data.companyId,
      payment_method_id: data.payment_method_id,
      discount_value: data.discount_value,
      increase_value: data.increase_value,
      tax_payment_value: data.tax_payment_value,
      total_value: data.total_value,
    },
  });
}

async function findAll({
  company_id,
  page,
  pageSize,
  nameOrCPF,
  status,
  startDate,
  endDate,
  orderBy,
}: {
  company_id: string;
  page: number;
  pageSize: number;
  nameOrCPF?: string;
  status?: number;
  orderBy?: string;
  startDate?: string;
  endDate?: string;
}) {
  const where: any = {};

  if (status !== undefined) {
    where.status = status;
  }

  if (nameOrCPF) {
    where.client = {
      OR: [
        { name: { contains: nameOrCPF, mode: 'insensitive' } },
        { cpf: { contains: nameOrCPF, mode: 'insensitive' } },
      ],
    };
  }

  if (company_id) {
    where.company_id = company_id;
  }

  if (startDate && endDate) {
    where.created_at = {
      gte: new Date(`${startDate}T00:00:00.000Z`),
      lte: new Date(`${endDate}T23:59:59.999Z`),
    };
  } else if (startDate) {
    where.created_at = {
      gte: new Date(`${startDate}T00:00:00.000Z`),
    };
  } else if (endDate) {
    where.created_at = {
      lte: new Date(`${endDate}T23:59:59.999Z`),
    };
  }

  const totalCount = await prisma.sale.count({ where });
  const totalPages = Math.ceil(totalCount / pageSize);
  const skip = Math.max(0, (page - 1) * pageSize);

  const sales = await prisma.sale.findMany({
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
      ProductSale: {
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
    orderBy: {
      created_at: orderBy === 'asc' ? 'asc' : 'desc',
    },
  });

  return {
    sales,
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
  const sale = await prisma.sale.findFirst({
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
      ProductSale: {
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

  if (sale) {
    const { ProductSale, ...rest } = sale as any;
    return { ...rest, products_sale: ProductSale };
  }

  return sale;
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
  const printer = new PdfPrinter(fonts);

  const sale = await findById({ company_id, id });

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
          { text: 'RECIBO', style: 'header', width: '*' },
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
            text: sale?.client?.name || 'Cliente não informado na venda',
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
            text: sale?.client?.cpf || '---',
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
              { text: 'Preço Unitário'.toUpperCase(), style: 'headerCentered' },
              { text: 'Preço Total'.toUpperCase(), style: 'headerCentered' },
            ],
            ...sale?.products_sale?.map((item: any, index: number) => [
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
            ]),
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
                text: `${formatMoney(Number(sale.total_value))}`,
                style: 'tableFooterText',
              },
            ],
            [
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              { text: 'FORMA DE PGTO.', style: 'tableFooter' },
              { text: sale?.payment?.name, style: 'tableFooterText' },
            ],
            [
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              { text: 'DESCONTOS', style: 'tableFooter' },
              {
                text: `${formatMoney(Number(sale?.discount_value))}`,
                style: 'tableFooterText',
              },
            ],
            [
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              { text: 'ACRÉSCIMOS', style: 'tableFooter' },
              {
                text: `${formatMoney(Number(sale?.increase_value))}`,
                style: 'tableFooterText',
              },
            ],
            [
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              { text: 'SUB-TOTAL', style: 'tableFooter' },
              {
                text: `${formatMoney(Number(sale?.total_value) + Number(sale?.increase_value) - Number(sale?.discount_value))}`,
                style: 'tableFooterText',
              },
            ],
          ],
        },
        margin: [0, 0, 0, 10],
      },

      {
        text: 'Obrigado pela compra!',
        style: 'centeredText',
        margin: [0, 20, 0, 10],
      },

      {
        text: 'Este cupom não possui valor fiscal.',
        style: 'centeredTextSmall',
        margin: [0, 0, 0, 10],
      },
    ],
    styles: styles,
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinitions);

  return pdfDoc;
}

export default { create, findAll, findById, generateCoupon };

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
