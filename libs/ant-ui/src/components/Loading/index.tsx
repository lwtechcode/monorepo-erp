import { Spin } from 'antd';
import { Icon } from '../Icon';

export function Loading() {
  return (
    <Spin
      indicator={<Icon component="LoadingOutlined" className="text-6xl" />}
    />
  );
}
