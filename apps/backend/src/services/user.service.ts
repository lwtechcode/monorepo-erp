import { prisma } from '../database/prisma';
import { UserDTO } from '../dto/user.dto';

async function create(data: UserDTO & { company_id: string }) {
  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: data.password,
      company_id: data.company_id,
      active: data.active,
      phone: data.phone,
    },
  });
}

async function findById({
  id,
  company_id,
}: {
  id: string;
  company_id: string;
}) {
  return prisma.user.findUnique({ where: { id, company_id: company_id } });
}

async function findByEmail({
  email,
  company_id,
}: {
  email: string;
  company_id: string;
}) {
  return prisma.user.findFirst({ where: { email, company_id } });
}

export default { create, findByEmail, findById };
