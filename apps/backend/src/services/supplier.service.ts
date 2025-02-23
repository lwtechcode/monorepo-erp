import PdfPrinter from 'pdfmake';
import { prisma } from '../database/prisma';
import { SupplierDTO } from '../dto/supplier.dto';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getAtualDateWithHours } from '../utils/date.util';
import { Supplier } from '@prisma/client';

async function create(data: SupplierDTO & { company_id: string }) {
  return prisma.supplier.create({
    data: {
      cnpj: data.cnpj,
      name: data.name,
      active: data?.active,
      address: data.address,
      cep: data.cep,
      city: data.city,
      complement: data.complement,
      email: data.email,
      neighborhood: data.neighborhood,
      number: data.number,
      observation: data.observation,
      phone: data.phone,
      state: data.state,
      company_id: data.company_id,
    },
  });
}

async function findById({ id, companyId }: { id: string; companyId: string }) {
  return prisma.supplier.findUnique({ where: { id, company_id: companyId } });
}

async function findAll({
  page,
  pageSize,
  companyId,
  nameOrCNPJ,
  status,
  orderBy,
}: {
  page: number;
  pageSize: number;
  companyId: string;
  nameOrCNPJ?: string;
  status?: string;
  orderBy?: string;
}) {
  const where: any = {
    OR: [
      { name: { contains: nameOrCNPJ } },
      { cnpj: { contains: nameOrCNPJ } },
    ],
  };

  if (status) {
    where.active = status === 'ativo';
  }

  if (companyId) {
    Object.assign(where, { company_id: companyId });
  }

  let orderByOption: any = {};

  if (orderBy === 'name') {
    orderByOption.name = 'asc';
  } else if (orderBy === 'createdAt') {
    orderByOption.created_at = 'desc';
  }

  const totalCount = await prisma.supplier.count({ where });
  const totalPages = Math.ceil(totalCount / pageSize);
  const skip = (page - 1) * pageSize;

  const suppliers = await prisma.supplier.findMany({
    where,
    skip,
    take: pageSize,
    orderBy: orderByOption,
  });

  return {
    suppliers,
    totalCount,
    totalPages,
  };
}

export async function update(
  supplierId: string,
  data: SupplierDTO,
  companyId: string,
) {
  const updateData = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return prisma.supplier.update({
    where: { id: supplierId, company_id: companyId },
    data: updateData,
  });
}

async function findAllOptions(companyId: string) {
  const suppliers = await prisma.supplier.findMany({
    where: { company_id: companyId },
  });
  return suppliers.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));
}

async function findAllToReport({
  companyId,
  nameOrCnpj,
  status,
  orderBy,
}: {
  companyId: string;
  nameOrCnpj?: string;
  status?: string;
  orderBy?: string;
}) {
  const where: any = {
    company_id: companyId,
  };

  if (status) {
    where.active = status === 'ativo';
  }

  if (nameOrCnpj) {
    where.OR = [
      { name: { contains: nameOrCnpj, mode: 'insensitive' } },
      { cnpj: { contains: nameOrCnpj.replace(/[.-]/g, '') } },
    ];
  }

  let orderByOption: any = {};

  if (orderBy === 'name') {
    orderByOption.name = 'asc';
  } else if (orderBy === 'createdAt') {
    orderByOption.created_at = 'desc';
  }

  const totalCount = await prisma.supplier.count({ where });

  const suppliers = await prisma.supplier.findMany({
    where,
    orderBy: orderByOption,
  });

  return {
    suppliers,
    totalCount,
  };
}

async function generatePDF(suppliers: Supplier[]) {
  const fonts = {
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique',
    },
  };

  const body = suppliers.map((supplier, index) => [
    { text: index + 1, style: 'cellCenter' },
    { text: supplier.name, style: 'cell' },
    { text: supplier.email, style: 'cell' },
    { text: supplier.cnpj, style: 'cellCenter' },
    { text: supplier.phone ? supplier.phone : '-', style: 'cell' },
    {
      text: [
        supplier?.address,
        supplier?.number,
        supplier?.neighborhood,
        supplier?.city,
        supplier?.state,
        supplier?.complement,
      ]
        .filter(Boolean)
        .join(', '),
      style: 'cell',
    },
  ]);

  const printer = new PdfPrinter(fonts);

  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: {
      font: 'Helvetica',
    },
    pageOrientation: 'landscape',
    pageMargins: [20, 20, 20, 20],
    footer: function (currentPage, pageCount) {
      return {
        text: currentPage.toString() + ' / ' + pageCount,
        alignment: 'right',
        style: {
          fontSize: 8,
        },
        margin: [0, 0, 20, 0],
      };
    },
    content: [
      {
        columns: [
          { text: 'Relatório de Fornecedores', style: 'header', width: '*' },
          { text: getAtualDateWithHours(), style: 'header', width: 'auto' },
        ],
      },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'Ord.', style: 'columnsTitle' },
              { text: 'Nome', style: 'columnsTitle' },
              { text: 'E-mail', style: 'columnsTitle' },
              { text: 'CNPJ', style: 'columnsTitle' },
              { text: 'Telefone', style: 'columnsTitle' },
              { text: 'Endereço', style: 'columnsTitle' },
            ],
            ...body,
          ],
        },
      },
      {
        columns: [
          { text: 'Total de Fornecedores:', style: 'legend', width: '*' },
          { text: suppliers.length, style: 'legend', width: 'auto' },
        ],
      },
    ],
    styles: {
      header: {
        fontSize: 8,
        bold: true,
      },
      columnsTitle: {
        fontSize: 8,
        bold: true,
      },
      cell: {
        fontSize: 8,
      },
      cellCenter: {
        fontSize: 8,
        alignment: 'center',
      },

      legend: {
        fontSize: 8,
        marginTop: 3,
        bold: true,
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinitions);

  return pdfDoc;
}

export default {
  create,
  findAll,
  findById,
  update,
  findAllOptions,
  generatePDF,
  findAllToReport,
};
