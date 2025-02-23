import { PropsWithChildren } from 'react';
import { NavigateFunction } from 'react-router-dom';

export type DashboardLayoutProps = PropsWithChildren<{
  navigate: NavigateFunction;
  userName: string;
  menuItems: any[];
}>;
