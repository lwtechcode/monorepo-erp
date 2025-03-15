import { Anchor, Button, Flex, Typography } from '@ant-ui/react';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../enums';
import { isAuthenticated } from '../../services/auth';
import { HeaderAuthProps } from './types';

export function HeaderAuth({ buttonType = 'login' }: HeaderAuthProps) {
  const navigate = useNavigate();

  const anchorItems = [
    {
      key: 'funcionalidades',
      href: '#funcionalidades',
      title: 'Funcionalidades',
    },
    {
      key: 'planos_e_precos',
      href: '#planos_e_precos',
      title: 'Planos e Preços',
    },
    {
      key: 'parceiros',
      href: '#parceiros',
      title: 'Parceiros',
    },
    {
      key: 'fale_conosco',
      href: '#fale_conosco',
      title: 'Fale conosco',
    },
  ];

  const isRegister = buttonType === 'register';

  return (
    <Flex
      className="fixed w-full bg-white px-12 py-4"
      align="baseline"
      justify="space-between"
    >
      <Typography.Link
        onClick={() => {
          isAuthenticated()
            ? navigate(RoutesEnum.Root)
            : navigate(RoutesEnum.Login);
        }}
        className="text-black"
      >
        Logo
      </Typography.Link>

      <Anchor direction="horizontal" items={anchorItems} />

      <Button
        onClick={() =>
          navigate(isRegister ? RoutesEnum.Register : RoutesEnum.Login)
        }
        type="primary"
      >
        {isRegister ? 'Criar conta' : 'Entrar'}
      </Button>
    </Flex>
  );
}
