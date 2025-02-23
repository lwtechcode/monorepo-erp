import { Dropdown as DropdownBase, DropdownProps } from 'antd';

export function Dropdown({
  children,
  placement = 'bottom',
  ...props
}: DropdownProps) {
  return (
    <DropdownBase placement={placement} {...props}>
      {children}
    </DropdownBase>
  );
}
