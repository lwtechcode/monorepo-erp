import PdfPrinter from "pdfmake";
import { prisma } from "../database/prisma";
import { BillToReceiveDTO } from "../dto/bill-to-receive.dto";
import { getFormattedPaymentStatus, paymentStatusEnum } from "../enum/status";
import { getAtualDateWithHours } from "../utils/date.util";
import { formatDate, formatMoney } from "../utils/formatters";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { BillToReceive } from "@prisma/client";

type FindAll = {
  page: number;
  pageSize: number;
  companyId: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
};

type FindById = {
  id: string;
  companyId: string;
};

type Remove = FindById;

type UpdateStatus = {
  ids: string[];
};

type Update = {
  billToReceiveId: string;
  data: BillToReceiveDTO;
  companyId: string;
};

async function create(data: BillToReceiveDTO & { companyId: string }) {
  return prisma.billToReceive.create({
    data: {
      description: data.description,
      due_date: new Date(data.due_date),
      client_id: data.client_id,
      observation: data.observation,
      receipt_date: data.receipt_date ? new Date(data.receipt_date) : null,
      value: data.value ? data.value : 0,
      company_id: data.companyId,
    },
  });
}

async function findAll({ status }: { status?: number }) {
  const where: any = {};

  if (status) {
    where.status = status;
  }

  return prisma.billToReceive.findMany({ where });
}

async function findAllPaginated({
  page,
  pageSize,
  companyId,
  description,
  startDate,
  endDate,
  status,
}: FindAll) {
  const where: any = {
    company_id: companyId,
  };

  if (description) {
    where.description = {
      contains: description,
      mode: "insensitive",
    };
  }

  if (startDate && endDate) {
    const startDateUTC = new Date(`${startDate}T00:00:00.000Z`);
    const endDateUTC = new Date(`${endDate}T23:59:59.999Z`);

    where.due_date = {
      gte: startDateUTC.toISOString(),
      lte: endDateUTC.toISOString(),
    };
  }

  if (status) {
    where.status = Number(status);
  }

  const [totalCount, totalBillsToReceive] = await Promise.all([
    prisma.billToReceive.count({ where }),
    prisma.billToReceive.aggregate({
      where,
      _sum: {
        value: true,
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);
  const skip = (page - 1) * pageSize;

  const billsToReceive = await prisma.billToReceive.findMany({
    where,
    orderBy: { created_at: "asc" },
    skip,
    take: pageSize,
    include: {
      client: {
        select: {
          name: true,
        },
      },
    },
  });

  const totalValue = Number(totalBillsToReceive._sum?.value) ?? 0;
  // (Number(totalBillsToReceive._sum?.added_value) ?? 0);

  return {
    billsToReceive,
    totalCount,
    totalPages,
    totalBillsToPay: totalValue,
  };
}

async function findById({ id, companyId }: FindById) {
  const where = {
    id,
    company_id: companyId,
  };

  return await prisma.billToReceive.findUnique({
    where,
  });
}

async function update({ billToReceiveId, companyId, data }: Update) {
  const updateData: any = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return prisma.billToReceive.update({
    where: { id: billToReceiveId, company_id: companyId },
    data: {
      ...updateData,
      due_date: updateData ? new Date(updateData.due_date) : null,
    },
  });
}

async function remove({ id, companyId }: Remove) {
  const where = {
    id,
    company_id: companyId,
  };

  return await prisma.billToReceive.delete({
    where,
  });
}

async function updateStatus({ ids }: UpdateStatus) {
  return await prisma.billToReceive.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      status: paymentStatusEnum.ATRASADA,
    },
  });
}

async function generatePDF(billsToReceive: BillToReceive[]) {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };

  const body = billsToReceive.map((billToReceive, index) => [
    { text: index + 1, style: "cellCenter" },
    { text: billToReceive.description, style: "cell" },
    { text: formatDate(billToReceive.due_date), style: "cellCenter" },
    { text: formatMoney(Number(billToReceive.value)), style: "cell" },
    {
      text: billToReceive.receipt_date
        ? formatDate(billToReceive.receipt_date)
        : "-",
      style: "cell",
    },
    //@ts-ignore
    { text: billToReceive.client?.name, style: "cell" },
    {
      text: billToReceive.status
        ? getFormattedPaymentStatus(billToReceive.status)
        : "-",
      style: "cell",
    },
  ]);

  const printer = new PdfPrinter(fonts);

  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: {
      font: "Helvetica",
    },
    pageOrientation: "portrait",
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
          {
            text: "Relatório de contas a receber",
            style: "header",
            width: "*",
          },
          { text: getAtualDateWithHours(), style: "header", width: "auto" },
        ],
      },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "*", "auto", "auto", "auto", "auto", "auto"],
          body: [
            [
              { text: "Ord.", style: "columnsTitle" },
              { text: "Descrição", style: "columnsTitle" },
              { text: "Data Vencimento", style: "columnsTitle" },
              { text: "Valor", style: "columnsTitle" },
              { text: "Data Recebimento", style: "columnsTitle" },
              { text: "Credor", style: "columnsTitle" },
              { text: "Status", style: "columnsTitle" },
            ],
            ...body,
          ],
        },
      },
      {
        columns: [
          { text: "Total de Contas:", style: "legend", width: "*" },
          { text: billsToReceive.length, style: "legend", width: "auto" },
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
  description,
  startDate,
  endDate,
  status,
}: // orderBy,
{
  companyId: string;
  description?: string;
  status?: string;
  orderBy?: string;
  startDate?: string;
  endDate?: string;
}) {
  const where: any = {
    company_id: companyId,
  };

  if (description) {
    where.description = {
      contains: description,
      mode: "insensitive",
    };
  }

  if (startDate && endDate) {
    const startDateUTC = new Date(`${startDate}T00:00:00.000Z`);
    const endDateUTC = new Date(`${endDate}T23:59:59.999Z`);

    where.due_date = {
      gte: startDateUTC.toISOString(),
      lte: endDateUTC.toISOString(),
    };
  }

  if (status) {
    where.status = Number(status);
  }

  // let orderByOption: any = {};

  // if (orderBy === "name") {
  //   orderByOption.name = "asc";
  // } else if (orderBy === "createdAt") {
  //   orderByOption.created_at = "desc";
  // }

  const totalCount = await prisma.billToReceive.count({ where });

  const billsToReceive = await prisma.billToReceive.findMany({
    where,
    orderBy: { created_at: "asc" },
    include: {
      client: {
        select: {
          name: true,
        },
      },
    },
    // orderBy: orderByOption,
  });

  return {
    billsToReceive,
    totalCount,
  };
}

export default {
  findAllPaginated,
  findAll,
  create,
  findById,
  update,
  remove,
  updateStatus,
  findAllToReport,
  generatePDF,
};
