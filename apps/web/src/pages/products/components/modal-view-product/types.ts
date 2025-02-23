import { Nullable } from '../../../../utils/types';
import { ProductResponseType } from '../../types';

export type ModalViewProductProps = {
  onClose: () => void;
  isVisibleModalViewProduct: boolean;
  productSelected: Partial<Nullable<ProductResponseType>>;
};
