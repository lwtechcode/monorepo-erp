import { prisma } from '../database/prisma';
import { ProductCategoryDTO } from '../dto/product-category.dto';

type FindById = {
  id: string;
  companyId: string;
};

type FindAll = {
  page: number;
  pageSize: number;
  companyId: string;
  name?: string;
};

type Update = {
  paymentId: string;
  data: ProductCategoryDTO;
  companyId: string;
};

async function create(data: ProductCategoryDTO & { company_id: string }) {
  return prisma.productCategory.create({
    data: {
      name: data.name,
      active: data?.active ?? true,
      company_id: data.company_id,
    },
  });
}

async function findById({ id, companyId }: FindById) {
  const where = { id, company_id: companyId };

  return await prisma.productCategory.findUnique({
    where,
  });
}

export async function findAll({ page, pageSize, companyId, name }: FindAll) {
  const where = {
    OR: [{ name: { contains: name } }],
  };

  if (companyId) {
    Object.assign(where, { company_id: companyId });
  }

  const totalCount = await prisma.productCategory.count({ where });
  const totalPages = Math.ceil(totalCount / pageSize);
  const skip = (page - 1) * pageSize;

  const productCategories = await prisma.productCategory.findMany({
    where,
    skip,
    take: pageSize,
  });

  return {
    productCategories,
    totalCount,
    totalPages,
  };
}

async function update({ companyId, data, paymentId }: Update) {
  const updateData = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return prisma.productCategory.update({
    where: { id: paymentId, company_id: companyId },
    data: updateData,
  });
}

async function findAllOptions(companyId: string) {
  const categories = await prisma.productCategory.findMany({
    where: { company_id: companyId },
  });
  return categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
}

export default { create, findById, findAll, update, findAllOptions };
