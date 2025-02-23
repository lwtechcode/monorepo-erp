import { RequestVerbEnum } from '../../../../enums';
import { Nullable } from '../../../../utils/types';
import { FormSupplierType } from '../../types';

export type ModalSupplierProps = {
  form: FormSupplier;
  isLoading?: boolean;
  onClose: () => void;
  type: RequestVerbEnum;
  isVisibleModalAddSupplier: boolean;
  handleAddSupplier: (supplier: FormSupplierType) => void;
  handleUpdateSupplier: (supplier: FormSupplierType & { id: string }) => void;
};

export type FormSupplier = Partial<
  Nullable<{
    id?: string;
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
    observation: string;
    active: boolean;
  }>
>;
