import { RequestVerbEnum } from '../../../../enums';
import { FormBillToPay } from '../../types';

export type ModalBillToPayProps = {
  onClose: () => void;
  isLoading?: boolean;
  form: FormBillToPay;
  type: RequestVerbEnum;
  isVisibleModalBillToPay: boolean;
  handleAddBillToPay: (billToPay: FormBillToPay) => void;
  handleUpdateBillToPay: (billToPay: FormBillToPay & { id: string }) => void;
};
