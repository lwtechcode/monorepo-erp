import { Menu as MenuBase, MenuProps } from 'antd';

export * from './types';

export function Menu({ ...props }: MenuProps) {
  return <MenuBase {...props} />;
}
