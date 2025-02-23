import { prisma } from '../database/prisma';
import { PaymentMethodDTO } from '../dto/payment-method.dto';

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
  data: PaymentMethodDTO;
  companyId: string;
};

async function create(data: PaymentMethodDTO & { company_id: string }) {
  return await prisma.paymentMethod.create({
    data: {
      name: data.name,
      tax: data.tax,
      observation: data.observation,
      company_id: data.company_id,
    },
  });
}

async function findById({ id, companyId }: FindById) {
  const where = { id, company_id: companyId };

  const clients = await prisma.paymentMethod.findUnique({
    where,
  });

  return clients;
}

export async function findAll({ page, pageSize, companyId, name }: FindAll) {
  const where = {
    OR: [{ name: { contains: name } }],
  };

  if (companyId) {
    Object.assign(where, { company_id: companyId });
  }

  const totalCount = await prisma.paymentMethod.count({ where });
  const totalPages = Math.ceil(totalCount / pageSize);
  const skip = (page - 1) * pageSize;

  const paymentMethods = await prisma.paymentMethod.findMany({
    where,
    skip,
    take: pageSize,
  });

  return {
    paymentMethods,
    totalCount,
    totalPages,
  };
}

async function update({ companyId, data, paymentId }: Update) {
  const updateData = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return prisma.paymentMethod.update({
    where: { id: paymentId, company_id: companyId },
    data: updateData,
  });
}

async function findAllOptions(companyId: string) {
  const paymentMethods = await prisma.paymentMethod.findMany({
    where: { company_id: companyId },
  });
  return paymentMethods.map((method) => ({
    value: method.id,
    label: method.name,
    tax: method.tax,
  }));
}

export default { create, findById, findAll, update, findAllOptions };
