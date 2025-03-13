"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../database/prisma");
const uuid_1 = require("../utils/uuid");
async function findByEmail(email) {
    return prisma_1.prisma.user.findUnique({
        where: { email },
        include: { company: true },
    });
}
async function registerCompany(company) {
    return prisma_1.prisma.company.create({
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
            code_register_validation: (0, uuid_1.generateUUID)(),
        },
    });
}
async function registerUserAdmin(adminUserDTO, userCompanyId) {
    return prisma_1.prisma.user.create({
        data: {
            name: adminUserDTO.name,
            email: adminUserDTO.email,
            password: adminUserDTO.password,
            company_id: userCompanyId,
        },
    });
}
async function addRoleAdminUser(idAdminUser, idRole) {
    await prisma_1.prisma.userPermission.create({
        data: {
            userId: idAdminUser,
            permissionId: idRole,
        },
    });
}
async function findByCodeRegisterValidation(code) {
    return prisma_1.prisma.company.findFirst({
        where: { code_register_validation: code },
    });
}
async function findAdminRole() {
    return prisma_1.prisma.permission.findFirst({ where: { name: 'ADMIN' } });
}
async function updateCompanyStatus(companyId) {
    return prisma_1.prisma.company.update({
        where: { id: companyId },
        data: {
            code_register_validation: null,
            validate_code_register_at: new Date(),
        },
    });
}
async function checkCompanyUniqueness(cnpj, phone, email) {
    const existingCompany = await prisma_1.prisma.company.findFirst({
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
exports.default = {
    findByEmail,
    registerCompany,
    registerUserAdmin,
    addRoleAdminUser,
    checkCompanyUniqueness,
    findAdminRole,
    findByCodeRegisterValidation,
    updateCompanyStatus,
};
