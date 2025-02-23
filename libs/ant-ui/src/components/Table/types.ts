import {
  GetProp,
  TableProps as TableBaseProps,
  TablePaginationConfig,
} from 'antd';
import { SorterResult } from 'antd/es/table/interface';

export type TableProps<T> = TableBaseProps<T>;

export type TableParams<T> = {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps<T>, 'onChange'>>[1];
};
