export type LoginDTO = {
  email: string;
  password: string;
};

export type RegisterDTO = {
  company_name: string;
  email: string;
  password: string;
  cnpj?: string;
  name: string;
  phone: string;
};

export type RegisterCompanyDTO = {
  company: CompanyDTO;
  adminUser: AdminUserDTO;
};

export type CompanyDTO = {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
};

export type AdminUserDTO = {
  name: string;
  email: string;
  password: string;
};
