import { Button, Icon } from '@ant-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components';
import { RoutesEnum } from '../enums';
import { useAuthStore } from '../services/auth';

export const MainLayout = () => {
  const { clearUserAuth, user } = useAuthStore();
  const navigate = useNavigate();

  function logout() {
    clearUserAuth();
    navigate(RoutesEnum.Login);
  }

  const menuItems = [
    {
      key: '1',
      label: (
        <Button type="link" onClick={logout}>
          Sair
        </Button>
      ),
      icon: <Icon component="ArrowLeftOutlined" />,
    },
  ];

  return (
    <DashboardLayout
      navigate={navigate}
      userName={user.name}
      menuItems={menuItems}
    >
      <Outlet />
    </DashboardLayout>
  );
};
