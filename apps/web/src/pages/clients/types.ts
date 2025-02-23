import { RequestVerbEnum } from '../../enums';
import { Nullable } from '../../utils/types';
import { FormClientTypes } from './components/modal-client/types';

export type FilterClient = {
  textFilterByNameAndCpf: string;
  status?: string;
  ordered?: string;
};

export type StateType = {
  form: FormClientTypes;
  type: RequestVerbEnum;
};

export type ClientResponse = {
  clients: ClientTypes[];
  totalPages: number;
  totalCount: number;
};

export type ClientTypes = {
  id: string;
  name: string;
  birthDate: string;
  cpf: string;
  rg: string;
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
  gender: string;
};

export type CreateClient = Partial<
  Nullable<{
    name: string;
    gender: string;
    birthDate: string;
    cpf: string;
    rg: string;
    email: string;
    phone: string;
    cep: string;
    address: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
    observation: string;
  }>
>;
