import { Dispatch, SetStateAction } from 'react';
import { FilterClient } from '../../../clients/types';
import { StateProducts } from '../../types';

export type ModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  total_items: string;
  value_gross: string;
  productsSelected: StateProducts;
  setModalNTFstate: Dispatch<SetStateAction<boolean>>;
  modalNTFstate: boolean;
  handleResetCartProduct: () => void;
};

export type StateClientFilterType = Pick<
  FilterClient,
  'textFilterByNameAndCpf'
>;
