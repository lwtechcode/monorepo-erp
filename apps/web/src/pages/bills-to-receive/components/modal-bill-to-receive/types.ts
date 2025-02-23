import { RequestVerbEnum } from '../../../../enums';
import { FormBillToReceive } from '../../types';

export type ModalBillToReceiveProps = {
  isVisibleModalBillToReceive: boolean;
  onClose: () => void;
  handleAddBillToReceive: (billToReceive: FormBillToReceive) => void;
  handleUpdateBillToReceive: (
    billToReceive: FormBillToReceive & { id: string },
  ) => void;
  form: FormBillToReceive;
  type: RequestVerbEnum;
  clientsOptions?: {
    value: string;
    label: string;
  }[];
};
