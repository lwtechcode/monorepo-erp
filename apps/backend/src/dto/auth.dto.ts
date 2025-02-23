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
