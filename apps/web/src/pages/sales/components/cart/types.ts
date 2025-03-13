import { TableParams } from '@ant-ui/react';
import { Key } from 'react';
import { UpdateProductType } from '../../hooks';

export type CartProps = {
  stateCart: any;
  isLoading: boolean;
  tableParams: TableParams<any>;
  handleTableChange(
    pagination: any,
    filters: any,
    sorter: any,
  ): never[] | undefined;
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
