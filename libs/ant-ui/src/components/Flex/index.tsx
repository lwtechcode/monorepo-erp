import { Flex as FlexBase } from 'antd';
import { FlexProps } from './types';

export function Flex({ children, ...props }: FlexProps) {
  return <FlexBase {...props}>{children}</FlexBase>;
}
