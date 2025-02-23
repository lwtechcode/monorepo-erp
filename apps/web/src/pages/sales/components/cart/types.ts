import { Key } from 'react';
import { UpdateProductType } from '../../hooks';

export type CartProps = {
  stateCart: any;
  isLoading: boolean;
  handleRemoveProduct(index: number): void;
  handleUpdateProduct: (newProduct: UpdateProductType, index: number) => void;
};

export type DataType = {
  key: Key;
  ord: number;
  name: string;
  quantity: string;
  value: string;
  subtotal: string;
};
