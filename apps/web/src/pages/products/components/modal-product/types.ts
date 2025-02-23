import { RequestVerbEnum } from '../../../../enums';
import { FormProduct } from '../../types';

export type ModalProductProps = {
  form: FormProduct;
  isLoading?: boolean;
  onClose: () => void;
  type: RequestVerbEnum;
  isVisibleModalAddProduct: boolean;
  handleAddProduct: (products: FormProduct) => void;
  suppliersOptions: { label: string; value: string }[];
  productCategoriesOptions: { label: string; value: string }[];
  handleUpdateProduct: (products: FormProduct & { id: string }) => void;
};
