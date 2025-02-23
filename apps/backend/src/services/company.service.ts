import { prisma } from "../database/prisma";
import { CompanyDTO } from "../dto/company.dto";

async function create(data: CompanyDTO) {
  return prisma.company.create({
    data: {
      name: data.name,
      active: data.active,
    },
  });
}

async function findById(id: string) {
  return prisma.company.findUnique({ where: { id } });
}

export default { create, findById };
