import { RequestVerbEnum } from '../../../../../enums';
import { Nullable } from '../../../../../utils/types';

export type ModalAddPaymentMethodProps = {
  isVisibleModalAddPaymentMethod: boolean;
  onClose: () => void;
  isLoading: boolean;
  handleAddPaymentMethod: (client: FormPaymentMethod) => void;
  handleUpdatePaymentMethod: (
    client: FormPaymentMethod & { id: string },
  ) => void;
  form: FormPaymentMethod;
  type: RequestVerbEnum;
};

export type FormPaymentMethod = Partial<
  Nullable<{
    name: string;
    observation: string;
    active?: boolean;
    id?: string;
    tax: number;
  }>
>;

export type StateType = {
  form: FormPaymentMethod;
  type: RequestVerbEnum;
};
