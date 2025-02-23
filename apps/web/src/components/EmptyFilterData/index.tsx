import { Flex, Typography } from '@ant-ui/react';
import { EmptyFilterDataProps } from './types';

export function EmptyFilterData({ onAction, type }: EmptyFilterDataProps) {
  return (
    <Flex vertical>
      <Typography.Text className="text-slate-600 text-center">
        Nenhum {type} encontrado
      </Typography.Text>

      <Flex gap={6}>
        <Typography.Paragraph className="text-slate-600 items-center text-center">
          Tente redefinir seu filtro ou
        </Typography.Paragraph>

        <Typography.Link onClick={onAction}>ver todos</Typography.Link>
      </Flex>
    </Flex>
  );
}
