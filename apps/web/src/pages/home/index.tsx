import { Card, Flex, Icon, Typography } from '@ant-ui/react';
import { useAuthStore } from '../../services/auth';

export function HomePage() {
  const { user } = useAuthStore();

  return (
    <Flex>
      <Card>
        <Flex gap={12}>
          <Icon component="UserOutlined" className="text-xl" />

          <Typography.Text className="font-bold">
            Usuário logado
          </Typography.Text>
        </Flex>

        <Typography.Text className="font-normal" type="secondary">
          Verifique os dados do usuário logado
        </Typography.Text>

        <Flex gap={4}>
          <Typography.Text className="font-bold">Nome:</Typography.Text>

          <Typography.Text className="font-normal" type="secondary">
            {user.name}
          </Typography.Text>
        </Flex>
      </Card>
    </Flex>
  );
}
