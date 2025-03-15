export type RegisterFormTypes = {
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
  nameUser: string;
  emailUser: string;
  passwordUser: string;
};

export type RequestRegisterTypes = {
  company: {
    name: string;
    cnpj: string;
    phone: string;
    email: string;
    street: string;
    number: string;
    complement: string | null;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  adminUser: {
    name: string;
    email: string;
    password: string;
  };
};
