import { prisma } from "../database/prisma";
import { UnitOfMeasurementDTO } from "../dto/unit-of-measurement.dto";

type FindById = {
  id: string;
  companyId: string;
};

type FindAll = {
  page: number;
  pageSize: number;
  companyId: string;
  nameOrAbbreviation?: string;
};

type Update = {
  unitOfMeasurementId: string;
  data: UnitOfMeasurementDTO;
  companyId: string;
};

async function create(data: UnitOfMeasurementDTO & { company_id: string }) {
  return await prisma.unitOfMeasurement.create({
    data: {
      name: data.name,
      abbreviation: data.abbreviation,
      company_id: data.company_id,
    },
  });
}

async function findById({ id, companyId }: FindById) {
  const where = { id, company_id: companyId };

  return await prisma.unitOfMeasurement.findUnique({
    where,
  });
}

async function findAll({
  page,
  pageSize,
  companyId,
  nameOrAbbreviation,
}: FindAll) {
  const where = {
    OR: [
      { name: { contains: nameOrAbbreviation } },
      { abbreviation: { contains: nameOrAbbreviation } },
    ],
  };

  if (companyId) {
    Object.assign(where, { company_id: companyId });
  }

  const totalCount = await prisma.unitOfMeasurement.count({ where });
  const totalPages = Math.ceil(totalCount / pageSize);
  const skip = (page - 1) * pageSize;

  const unitsMeasurements = await prisma.unitOfMeasurement.findMany({
    where,
    skip,
    take: pageSize,
  });

  return {
    unitsMeasurements,
    totalCount,
    totalPages,
  };
}

async function update({ companyId, data, unitOfMeasurementId }: Update) {
  const updateData = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return prisma.unitOfMeasurement.update({
    where: { id: unitOfMeasurementId, company_id: companyId },
    data: updateData,
  });
}

async function findAllOptions(companyId: string) {
  const units = await prisma.unitOfMeasurement.findMany({
    where: { company_id: companyId },
  });
  return units.map((unit) => ({
    value: unit.id,
    label: unit.abbreviation,
  }));
}

export default {
  create,
  findAll,
  update,
  findById,
  findAllOptions,
};
