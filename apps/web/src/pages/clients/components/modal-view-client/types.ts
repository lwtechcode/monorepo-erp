import { Nullable } from '../../../../utils/types';
import { ClientTypes } from '../../types';

export type ModalViewClientProps = {
  onClose: () => void;
  isVisibleModalViewClient: boolean;
  clientSelected: Partial<Nullable<ClientTypes>>;
};
