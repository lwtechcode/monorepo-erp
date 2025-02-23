import { Select as SelectBase } from 'antd';
import { SelectProps } from './types';

export function Select({ ...props }: SelectProps) {
  return <SelectBase {...props} />;
}
