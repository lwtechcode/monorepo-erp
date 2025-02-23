import { Button, Flex, Typography } from '@ant-ui/react';
import { useNavigate } from 'react-router-dom';
import notFoundImage from '../../assets/notfound.svg';
import { RoutesEnum } from '../../enums';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Flex vertical justify="center" align="center" className="h-full">
      <img src={notFoundImage} width={200} />
      <Typography.Title level={3} className="mt-4 text-slate-900">
        Não encontrado
      </Typography.Title>

      <Typography.Paragraph type="secondary">
        A página que você está tentando acessar não existe
      </Typography.Paragraph>

      <Button onClick={() => navigate(RoutesEnum.Root)} type="primary">
        Ir para o início
      </Button>
    </Flex>
  );
}
