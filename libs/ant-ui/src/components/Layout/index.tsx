import { Layout as LayoutBase } from 'antd';
import { LayoutProps } from './types';

export function Layout({ children, ...props }: LayoutProps) {
  return <LayoutBase {...props}>{children}</LayoutBase>;
}

Layout.Content = LayoutBase.Content;
Layout.Footer = LayoutBase.Footer;
Layout.Header = LayoutBase.Header;
Layout.Sider = LayoutBase.Sider;

export default Layout;
