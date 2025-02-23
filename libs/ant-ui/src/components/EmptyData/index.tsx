import { Empty, Typography } from 'antd';
import { EmptyDataProps } from './types';

export function EmptyData({ children }: EmptyDataProps) {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 60 }}
      description={
        <Typography.Text type="secondary">
          Nenhum dado foi encontrado!
        </Typography.Text>
      }
      className="flex flex-col items-center justify-center"
    >
      {children}
    </Empty>
  );
}
