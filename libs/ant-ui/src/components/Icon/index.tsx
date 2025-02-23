import IconBase, * as Icons from '@ant-design/icons';
import { IconProps } from './types';

export function Icon({ component, className, onClick, style }: IconProps) {
  const ElementIcon = Icons[component];

  return (
    <IconBase
      component={ElementIcon as unknown as React.ForwardRefExoticComponent<any>}
      className={className}
      onClick={onClick}
      style={style}
    />
  );
}
