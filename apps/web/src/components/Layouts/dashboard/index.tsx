import { Flex, Grid, Layout } from '@ant-ui/react';
import { BottomNavigationBar } from '../bottomBar';
import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { DashboardLayoutProps } from './types';

export function DashboardLayout({
  children,
  navigate,
  userName,
  menuItems,
}: DashboardLayoutProps) {
  const { useBreakpoint } = Grid.Root;

  const screens = useBreakpoint();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {screens.md ? <Sidebar navigate={navigate} /> : null}

      <Layout>
        <Header userName={userName} menuItems={menuItems} />

        <Layout.Content
          style={{
            padding: '12px 12px',
            marginBottom: !screens.md ? '48px' : 0,
          }}
        >
          <Flex
            className="bg-white h-full m-0"
            style={{
              padding: '12px 12px',
              borderRadius: 12,
            }}
            gap={12}
            vertical
          >
            {children}
          </Flex>
        </Layout.Content>

        {!screens.md ? <BottomNavigationBar navigate={navigate} /> : null}

        {screens.md ? (
          <Layout.Footer className="text-center">
            Sistema de Gestão Empresarial ©{new Date().getFullYear()} Criado
            por Bruno e Leandro.
          </Layout.Footer>
        ) : null}
      </Layout>
    </Layout>
  );
}
