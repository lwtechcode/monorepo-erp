import PdfPrinter from "pdfmake";
import { prisma } from "../database/prisma";
import { BillToPayDTO } from "../dto/bill-to-pay.dto";
import { getFormattedPaymentStatus, paymentStatusEnum } from "../enum/status";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { getAtualDateWithHours } from "../utils/date.util";
import { BillToPay } from "@prisma/client";
import { formatDate, formatMoney } from "../utils/formatters";

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
  billToPayId: string;
  data: BillToPayDTO;
  companyId: string;
};

async function create(
  data: BillToPayDTO & { companyId: string; status: number }
) {
  return prisma.billToPay.create({
    data: {
      description: data.description,
      due_date: new Date(data.due_date),
      pay_date: data.pay_date ? new Date(data.pay_date) : null,
      value: data.value ? data.value : 0,
      creditor: data.creditor,
      observation: data.observation,
      company_id: data.companyId,
      // added_value: data.added_value ? data.added_value : 0,
      status: data.status, //MEXER
      // installment: data.installment,
      // recurrence: data.recurrence,
      // number_of_installments: data.number_of_installments,
    },
  });
}

async function findAll({ status }: { status?: number }) {
  const where: any = {};

  if (status) {
    where.status = status;
  }

  return prisma.billToPay.findMany({ where });
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

  const [totalCount, totalBillsToPay] = await Promise.all([
    prisma.billToPay.count({ where }),
    prisma.billToPay.aggregate({
      where,
      _sum: {
        value: true,
        added_value: true,
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);
  const skip = (page - 1) * pageSize;

  const billsToPay = await prisma.billToPay.findMany({
    where,
    orderBy: { created_at: "asc" },
    skip,
    take: pageSize,
  });

  const totalValue =
    (Number(totalBillsToPay._sum?.value) ?? 0) +
    (Number(totalBillsToPay._sum?.added_value) ?? 0);

  return {
    billsToPay,
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

  return await prisma.billToPay.findUnique({
    where,
  });
}

async function update({ billToPayId, companyId, data }: Update) {
  const updateData: any = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return prisma.billToPay.update({
    where: { id: billToPayId, company_id: companyId },
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

  return await prisma.billToPay.delete({
    where,
  });
}

async function updateStatus({ ids }: UpdateStatus) {
  return await prisma.billToPay.updateMany({
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

async function generatePDF(clients: BillToPay[]) {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };

  const body = clients.map((billToPay, index) => [
    { text: index + 1, style: "cellCenter" },
    { text: billToPay.description, style: "cell" },
    { text: formatDate(billToPay.due_date), style: "cellCenter" },
    { text: formatMoney(Number(billToPay.value)), style: "cell" },
    {
      text: billToPay.pay_date ? formatDate(billToPay.pay_date) : "-",
      style: "cell",
    },
    { text: billToPay.creditor, style: "cell" },
    {
      text: billToPay.status
        ? getFormattedPaymentStatus(billToPay.status)
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
          { text: "Relatório de contas a pagar", style: "header", width: "*" },
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
              { text: "Data Pagamento", style: "columnsTitle" },
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

  const totalCount = await prisma.billToPay.count({ where });

  const billsToPay = await prisma.billToPay.findMany({
    where,
    orderBy: { created_at: "asc" },
    // orderBy: orderByOption,
  });

  return {
    billsToPay,
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
  generatePDF,
  findAllToReport,
};
