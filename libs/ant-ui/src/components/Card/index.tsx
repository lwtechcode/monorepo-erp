import { Card as CardBase } from 'antd';
import { CardProps } from './types';

export function Card({ children, ...props }: CardProps) {
  return <CardBase {...props}>{children}</CardBase>;
}
