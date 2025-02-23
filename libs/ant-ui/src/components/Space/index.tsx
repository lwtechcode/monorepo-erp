import { Space as SpaceBase } from 'antd';
import { SpaceProps } from './types';

export function Space({ children, ...props }: SpaceProps) {
  return <SpaceBase {...props}>{children}</SpaceBase>;
}
