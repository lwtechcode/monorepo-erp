import { List as ListBase } from 'antd';
import { ListProps } from './types';

export function List<T>({ ...props }: ListProps<T>) {
  return <ListBase {...props} />;
}

List.Item = ListBase.Item;

export default List;
