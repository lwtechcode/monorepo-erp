import { App } from 'antd';
import { AppProps } from './types';

export function AppComponent({ children, ...props }: AppProps) {
  return <App {...props}>{children}</App>;
}

export function useApp() {
  const methods = App.useApp();

  return { ...methods };
}
