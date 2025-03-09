import { prisma } from '../database/prisma';
import { AdminUserDTO, CompanyDTO } from '../dto/auth.dto';
import { generateUUID } from '../utils/uuid';

async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: { company: true },
  });
}

async function registerCompany(company: CompanyDTO) {
  return prisma.company.create({
    data: {
      name: company.name,
      cnpj: company.cnpj,
      phone: company.phone,
      email: company.email,
      street: company.street,
      number: company.number,
      complement: company.complement,
      neighborhood: company.neighborhood,
      city: company.city,
      state: company.state,
      zipCode: company.zipCode,
      code_register_validation: generateUUID(),
    },
  });
}

async function registerUserAdmin(
  adminUserDTO: AdminUserDTO,
  userCompanyId: string,
) {
  return prisma.user.create({
    data: {
      name: adminUserDTO.name,
      email: adminUserDTO.email,
      password: adminUserDTO.password,
      company_id: userCompanyId,
    },
  });
}

async function addRoleAdminUser(idAdminUser: string, idRole: string) {
  await prisma.userPermission.create({
    data: {
      userId: idAdminUser,
      permissionId: idRole,
    },
  });
}

async function findByCodeRegisterValidation(code: string) {
  return prisma.company.findFirst({
    where: { code_register_validation: code },
  });
}

async function findAdminRole() {
  return prisma.permission.findFirst({ where: { name: 'ADMIN' } });
}

async function updateCompanyStatus(companyId: string) {
  return prisma.company.update({
    where: { id: companyId },
    data: {
      code_register_validation: null,
      validate_code_register_at: new Date(),
    },
  });
}

async function checkCompanyUniqueness(
  cnpj: string,
  phone: string,
  email: string | null,
) {
  const existingCompany = await prisma.company.findFirst({
    where: {
      OR: [{ cnpj: cnpj }, { phone: phone }, { email: email }],
    },
  });

  if (existingCompany) {
    const errorMessages = [];

    if (existingCompany.cnpj === cnpj) {
      errorMessages.push('CNPJ já cadastrado.');
    }
    if (existingCompany.phone === phone) {
      errorMessages.push('Telefone já cadastrado.');
    }
    if (email && existingCompany.email === email) {
      errorMessages.push('Email já cadastrado.');
    }

    throw new Error(errorMessages.join(', '));
  }

  return true;
}

export default {
  findByEmail,
  registerCompany,
  registerUserAdmin,
  addRoleAdminUser,
  checkCompanyUniqueness,
  findAdminRole,
  findByCodeRegisterValidation,
  updateCompanyStatus,
};
