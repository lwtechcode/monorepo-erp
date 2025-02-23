import * as Icons from '@ant-design/icons';
import { CSSProperties } from 'react';

export type IconProps = {
  component: keyof typeof Icons;
  color?: string;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
};
