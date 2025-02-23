import { Checkbox as CheckboxBase } from 'antd';
import { CheckboxProps } from './types';

export function Checkbox({ ...props }: CheckboxProps) {
  return <CheckboxBase {...props} />;
}
