import { Table as TableBase } from 'antd';
import { TableProps } from './types';

export * from './types';

export function Table<T>({ ...props }: TableProps<T>) {
  return <TableBase {...props} />;
}

Table.Column = TableBase.Column;
Table.ColumnGroup = TableBase.ColumnGroup;
Table.EXPAND_COLUMN = TableBase.EXPAND_COLUMN;
Table.SELECTION_NONE = TableBase.SELECTION_NONE;
Table.SELECTION_ALL = TableBase.SELECTION_ALL;

export default Table;
