import { ConfigProvider as ConfigProviderBase } from 'antd';
import { ConfigProviderProps } from './types';

export function ConfigProvider({ children, ...props }: ConfigProviderProps) {
  return <ConfigProviderBase {...props}>{children}</ConfigProviderBase>;
}
