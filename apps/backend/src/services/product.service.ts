import PdfPrinter from "pdfmake";
import { prisma } from "../database/prisma";
import { ProductDTO } from "../dto/product.dto";
import { getAtualDateWithHours } from "../utils/date.util";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { formatMoney } from "../utils/formatters";
import { Product } from "@prisma/client";

type FindAll = {
  page: number;
  pageSize: number;
  companyId: string;
  nameOrBarCodeOrSKU?: string;
  status?: string;
  orderBy?: string;
  discount?: boolean;
  category?: string;
};

type FindById = {
  id: string;
  companyId: string;
};

type FindAllToReport = {
  companyId: string;
  nameOrBarCode?: string;
  status?: string;
  orderBy?: string;
  discount?: boolean;
  categoryId?: string;
};

type Update = {
  productId: string;
  data: ProductDTO;
  companyId: string;
};

async function create(data: ProductDTO & { companyId: string }) {
  return prisma.product.create({
    data: {
      discount_tax: data.discount_tax,
      name: data.name,
      cost_price: data.cost_price,
      sale_price: data.sale_price,
      active: data?.active,
      bar_code: data.bar_code,
      description: data.description,
      location_in_store: data.location_in_store,
      manufacturer: data.manufacturer,
      stock: data.stock,
      model: data.model,
      observation: data.observation,
      product_origin: data.product_origin,
      sku: data.sku,
      supplier_id: data.supplier_id,
      company_id: data.companyId,
      product_category_id: data.product_category_id,
    },
  });
}

async function findById({ id, companyId }: FindById) {
  return prisma.product.findUnique({ where: { id, company_id: companyId } });
}

async function findAll({
  page,
  pageSize,
  companyId,
  nameOrBarCodeOrSKU,
  status,
  orderBy,
  discount = false,
  category,
}: FindAll) {
  const where: any = {
    OR: [
      { name: { contains: nameOrBarCodeOrSKU } },
      { sku: { contains: nameOrBarCodeOrSKU } },
      { bar_code: { contains: nameOrBarCodeOrSKU } },
    ],
  };

  if (status) {
    where.active = status === "ativo";
  }

  if (discount) {
    where.discount = { gt: 0 };
  }

  if (category) {
    where.product_category_id = category;
  }

  if (companyId) {
    Object.assign(where, { company_id: companyId });
  }

  let orderByOption: any = {};

  if (orderBy === "name") {
    orderByOption.name = "asc";
  } else if (orderBy === "createdAt") {
    orderByOption.created_at = "desc";
  }

  const totalCount = await prisma.product.count({ where });
  const totalPages = Math.ceil(totalCount / pageSize);
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    where,
    skip,
    take: pageSize,
    orderBy: orderByOption,
    include: {
      supplier: {
        select: {
          name: true,
          id: true,
        },
      },
      productCategory: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return {
    products,
    totalCount,
    totalPages,
  };
}

export async function update({ companyId, data, productId }: Update) {
  const updateData = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return prisma.product.update({
    where: { id: productId, active: true, company_id: companyId },
    data: updateData,
  });
}

async function generatePDF(products: Product[]) {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };

  const body = products.map((product: Product, index) => {
    return [
      { text: index + 1, style: "cellCenter" },
      { text: product.name, style: "cell" },
      // { text: product.sku || "-", style: "cellCenter" },
      { text: product.manufacturer || "-", style: "cell" },
      {
        //@ts-ignore
        text: product?.productCategory?.name || "-",
        style: "cell",
      },
      { text: product.product_origin || "-", style: "cell" },
      {
        text: product.cost_price
          ? formatMoney(Number(product.cost_price))
          : "-",
        style: "cell",
      },
      {
        text: product.sale_price
          ? formatMoney(Number(product.sale_price))
          : "-",
        style: "cell",
      },
      { text: product.stock || "-", style: "cell" },
      // { text: product.manage_stock ? "S" : "N" || "-", style: "cell" },
      // { text: product.min_stock || "-", style: "cell" },
      { text: product.description || "-", style: "cell" },
      { text: product.observation || "-", style: "cell" },
      {
        //@ts-ignore
        text: product.supplier?.name || "-",
        style: "cell",
      },
    ];
  });

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
          { text: "Relatório de Produtos", style: "header", width: "*" },
          { text: getAtualDateWithHours(), style: "header", width: "auto" },
        ],
      },
      {
        table: {
          headerRows: 1,
          widths: [
            "auto",
            "*",
            // "auto",
            // "auto",
            "auto",
            // "auto",
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
              // { text: "SKU", style: "columnsTitle" },
              { text: "Fabricante", style: "columnsTitle" },
              { text: "Categ.", style: "columnsTitle" },
              { text: "Orig.", style: "columnsTitle" },
              { text: "Preço custo", style: "columnsTitle" },
              { text: "Preço venda", style: "columnsTitle" },
              { text: "Estoque", style: "columnsTitle" },
              // { text: "Ger. estoque", style: "columnsTitle" },
              // { text: "Est. mínimo", style: "columnsTitle" },
              { text: "Descrição", style: "columnsTitle" },
              { text: "Observação", style: "columnsTitle" },
              { text: "Fornecedor", style: "columnsTitle" },
            ],
            ...body,
          ],
        },
      },
      {
        columns: [
          { text: "Total de Produtos:", style: "legend", width: "*" },
          { text: products.length, style: "legend", width: "auto" },
        ],
      },
    ],
    styles: {
      header: {
        fontSize: 6,
        bold: true,
      },
      columnsTitle: {
        fontSize: 6,
        bold: true,
      },
      cell: {
        fontSize: 6,
      },
      cellCenter: {
        fontSize: 6,
        alignment: "center",
      },

      legend: {
        fontSize: 6,
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
  nameOrBarCode,
  status,
  orderBy,
  discount,
  categoryId,
}: FindAllToReport) {
  const where: any = {
    active: status === "ativo" || status === "",

    OR: [
      { name: { contains: nameOrBarCode } },
      { sku: { contains: nameOrBarCode } },
      { bar_code: { contains: nameOrBarCode } },
    ],
  };

  if (discount) {
    where.discount_tax = { gt: 0 };
  }

  if (categoryId) {
    where.product_category_id = categoryId;
  }

  if (companyId) {
    Object.assign(where, { company_id: companyId });
  }

  let orderByOption: any = {};

  if (orderBy === "name") {
    orderByOption.name = "asc";
  } else if (orderBy === "createdAt") {
    orderByOption.created_at = "desc";
  } else if (orderBy === "price") {
    orderByOption.sale_price = "asc";
  }

  const totalCount = await prisma.product.count({ where });

  const products = await prisma.product.findMany({
    where,
    orderBy: orderByOption,
    include: {
      supplier: {
        select: {
          name: true,
          id: true,
        },
      },
      productCategory: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return {
    products,
    totalCount,
  };
}

export default {
  create,
  findById,
  findAll,
  update,
  findAllToReport,
  generatePDF,
};
