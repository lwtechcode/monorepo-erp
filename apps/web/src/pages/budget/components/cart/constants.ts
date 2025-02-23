import type { TableColumnsType } from 'antd';
import { DataType } from './types';

export const columns: TableColumnsType<DataType> = [
  {
    key: 'ord',
    title: 'Ord.',
    dataIndex: 'ord',
    sorter: (a, b) => a.ord - b.ord,
    showSorterTooltip: false,
    width: '10%',
    ellipsis: true,
  },
  {
    key: 'name',
    title: 'Nome',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    showSorterTooltip: false,
    ellipsis: true,
    width: '60%',
  },
  {
    key: 'quantity',
    title: 'Quantidade',
    dataIndex: 'quantity',
    width: '10%',
    ellipsis: true,
  },
  {
    key: 'value',
    title: 'Valor',
    dataIndex: 'value',
    width: '10%',
    ellipsis: true,
  },
  {
    key: 'subtotal',
    title: 'Subtotal',
    dataIndex: 'subtotal',
    width: '10%',
    ellipsis: true,
  },
];
