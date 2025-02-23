import { Button as ButtonBase } from 'antd';

import { LinkProps } from './types';

export function Link({ children, ...props }: LinkProps) {
  return (
    <ButtonBase type="link" {...props}>
      {children}
    </ButtonBase>
  );
}
