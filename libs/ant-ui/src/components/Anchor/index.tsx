import { Anchor as AnchorBase } from 'antd';
import { AnchorProps } from './types';

export function Anchor({ ...props }: AnchorProps) {
  return <AnchorBase {...props} />;
}
