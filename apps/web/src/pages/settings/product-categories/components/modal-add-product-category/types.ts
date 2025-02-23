import { RequestVerbEnum } from '../../../../../enums';
import { Nullable } from '../../../../../utils/types';

export type ModalAddProductCategoryProps = {
  isVisibleModalAddProductCategory: boolean;
  onClose: () => void;
  isFetchingAddProductCategory: boolean;
  isFetchingUpdateProductCategory: boolean;
  handleAddProductCategory: (client: FormProductCategory) => void;
  handleUpdateProductCategory: (
    client: FormProductCategory & { id: string },
  ) => void;
  form: FormProductCategory;
  type: RequestVerbEnum;
};

export type FormProductCategory = Partial<
  Nullable<{
    name: string;
    observation: string;
    active?: boolean;
    id?: string;
  }>
>;

export type StateType = {
  form: FormProductCategory;
  type: RequestVerbEnum;
};
