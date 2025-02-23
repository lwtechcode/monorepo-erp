import { Avatar as AvatarBase } from 'antd';
import { AvatarProps } from './types';

export function Avatar({ ...props }: AvatarProps) {
  return <AvatarBase {...props} />;
}
