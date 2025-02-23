import { Client } from "@prisma/client";
import { prisma } from "../database/prisma";
import { ClientDTO } from "../dto/client.dto";
import { getAtualDateWithHours } from "../utils/date.util";
import PdfPrinter from "pdfmake";
import { formatCPF, formatDate, formatPhone } from "../utils/formatters";
import { TDocumentDefinitions } from "pdfmake/interfaces";

async function create(data: ClientDTO) {
  return prisma.client.create({
    data: {
      gender: data.gender,
      name: data.name,
      active: true,
      address: data.address,
      birthDate: data.birthDate ? new Date(data.birthDate) : null,
      cep: data.cep,
      city: data.city,
      complement: data.complement,
      cpf: data.cpf,
      email: data.email,
      neighborhood: data.neighborhood,
      number: data.number,
      phone: data.phone,
      company_id: data.company_id,
      state: data.state,
      rg: data.rg,
      observation: data.observation,
    },
  });
}

async function findById({ id, companyId }: { id: string; companyId: string }) {
  return prisma.client.findUnique({ where: { id, company_id: companyId } });
}

async function findAll({
  page,
  pageSize,
  companyId,
  nameOrCPF,
  status,
  orderBy,
}: {
  page: number;
  pageSize: number;
  companyId: string;
  nameOrCPF?: string;
  status?: string;
  orderBy?: string;
}) {
  const where: any = {
    company_id: companyId,
  };

  if (status) {
    where.active = status === "ativo";
  }

  if (nameOrCPF) {
    where.OR = [
      { name: { contains: nameOrCPF, mode: "insensitive" } },
      { cpf: { contains: nameOrCPF.replace(/[.-]/g, "") } },
      { id: { contains: nameOrCPF } },
    ];
  }

  let orderByOption: any = {};

  if (orderBy === "name") {
    orderByOption.name = "asc";
  } else if (orderBy === "createdAt") {
    orderByOption.created_at = "desc";
  }

  const totalCount = await prisma.client.count({ where });
  const totalPages = Math.ceil(totalCount / pageSize);
  const skip = (page - 1) * pageSize;

  const clients = await prisma.client.findMany({
    where,
    skip,
    take: pageSize,
    orderBy: orderByOption,
  });

  return {
    clients,
    totalCount,
    totalPages,
  };
}

export async function update(
  clientId: string,
  data: ClientDTO,
  companyId: string
) {
  const updateData = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return prisma.client.update({
    where: { id: clientId, company_id: companyId },
    data: updateData,
  });
}

async function findAllOptions(companyId: string) {
  const clients = await prisma.client.findMany({
    where: { company_id: companyId },
  });
  return clients.map((client) => ({
    value: client.id,
    label: client.name,
  }));
}

async function generatePDF(clients: Client[]) {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };

  const body = clients.map((client, index) => [
    { text: index + 1, style: "cellCenter" },
    { text: client.name, style: "cell" },
    { text: client.gender, style: "cellCenter" },
    { text: client.cpf ? formatCPF(client.cpf) : "-", style: "cell" },
    { text: client.rg, style: "cell" },
    { text: client.phone ? formatPhone(client.phone) : "-", style: "cell" },
    { text: client.email, style: "cell" },
    {
      text: client.birthDate ? formatDate(client.birthDate) : "--",
      style: "cell",
    },
    { text: client.city, style: "cell" },
    { text: client.state, style: "cell" },
    { text: client.active ? "Ativo" : "Inativo", style: "cell" },
  ]);

  const printer = new PdfPrinter(fonts);

  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: {
      font: "Helvetica",
    },
    pageOrientation: "landscape",
    pageMargins: [20, 20, 20, 20],
    footer: function (currentPage, pageCount) {
      return {
        text: currentPage.toString() + " / " + pageCount,
        alignment: "right",
        style: {
          fontSize: 8,
        },
        margin: [0, 0, 20, 0],
      };
    },
    content: [
      {
        columns: [
          { text: "Relatório de Clientes", style: "header", width: "*" },
          { text: getAtualDateWithHours(), style: "header", width: "auto" },
        ],
      },
      {
        table: {
          headerRows: 1,
          widths: [
            "auto",
            "*",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
          ],
          body: [
            [
              { text: "Ord.", style: "columnsTitle" },
              { text: "Nome", style: "columnsTitle" },
              { text: "Gênero", style: "columnsTitle" },
              { text: "CPF", style: "columnsTitle" },
              { text: "RG", style: "columnsTitle" },
              { text: "Telefone", style: "columnsTitle" },
              { text: "Email", style: "columnsTitle" },
              { text: "Data Nasc", style: "columnsTitle" },
              { text: "Cidade", style: "columnsTitle" },
              { text: "Estado", style: "columnsTitle" },
              { text: "Status", style: "columnsTitle" },
            ],
            ...body,
          ],
        },
      },
      {
        columns: [
          { text: "Total de Clientes:", style: "legend", width: "*" },
          { text: clients.length, style: "legend", width: "auto" },
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
        alignment: "center",
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

async function findAllToReport({
  companyId,
  nameOrCPF,
  status,
  orderBy,
}: {
  companyId: string;
  nameOrCPF?: string;
  status?: string;
  orderBy?: string;
}) {
  const where: any = {
    company_id: companyId,
  };

  if (status) {
    where.active = status === "ativo";
  }

  if (nameOrCPF) {
    where.OR = [
      { name: { contains: nameOrCPF, mode: "insensitive" } },
      { cpf: { contains: nameOrCPF.replace(/[.-]/g, "") } },
    ];
  }

  let orderByOption: any = {};

  if (orderBy === "name") {
    orderByOption.name = "asc";
  } else if (orderBy === "createdAt") {
    orderByOption.created_at = "desc";
  }

  const totalCount = await prisma.client.count({ where });

  const clients = await prisma.client.findMany({
    where,
    orderBy: orderByOption,
  });

  return {
    clients,
    totalCount,
  };
}

export default {
  findAllToReport,
  create,
  findById,
  findAll,
  update,
  findAllOptions,
  generatePDF,
};
