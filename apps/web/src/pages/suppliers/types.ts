import { RequestVerbEnum } from '../../enums';
import { Nullable } from '../../utils/types';
import { FormSupplier } from './components/modal-supplier/types';

export type FilterSuppliers = {
  textFilterByNameAndCnpj: string;
  status: string;
  ordered: string;
};

export type StateType = {
  form: FormSupplier;
  type: RequestVerbEnum;
};

export type SuppliersResponse = {
  suppliers: Array<SupplierType>;
  totalPages: number;
  totalCount: number;
};

export type SupplierType = {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
  active: boolean;
  deleted: boolean;
  created_at: string;
  user_company_id: string;
  observation: string;
};

export type FormSupplierType = Partial<
  Nullable<{
    id: string;
    name: string;
    cnpj?: string | null;
    email?: string | null;
    phone?: string | null;
    cep?: string | null;
    address?: string | null;
    number?: string | null;
    neighborhood?: string | null;
    city?: string | null;
    state?: string | null;
    complement?: string | null;
    observation?: string | null;
    active?: boolean;
  }>
>;
