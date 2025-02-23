import { RequestVerbEnum } from '../../../../enums';
import { Nullable } from '../../../../utils/types';
import { CreateClient } from '../../types';

export type ModalClientProps = {
  isLoading: boolean;
  onClose: () => void;
  form: FormClientTypes;
  type: RequestVerbEnum;
  isVisibleModalAddClient: boolean;
  handleAddClient: (client: CreateClient) => void;
  handleUpdateClient: (client: CreateClient & { id: string }) => void;
};

export type FormClientTypes = Partial<
  Nullable<{
    id?: string;
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
    active?: boolean;
  }>
>;
