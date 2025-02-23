import { Button as ButtonBase } from 'antd';
import { ButtonProps } from './types';

export function Button({ children, ...props }: ButtonProps) {
  return <ButtonBase {...props}>{children}</ButtonBase>;
}
