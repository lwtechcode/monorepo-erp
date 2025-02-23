import { Icon, Layout, Menu, MenuProps, Typography } from '@ant-ui/react';
import React, { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { RoutesEnum } from '../../../enums';

type MenuItem = Required<MenuProps>['items'][number];

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export function Sidebar({ navigate }: { navigate: NavigateFunction }) {
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuItem[] = [
    getItem(
      <Typography.Link onClick={() => navigate(RoutesEnum.Root)}>
        Dashboard
      </Typography.Link>,
      '1',
      <Icon
        component="DashboardOutlined"
        onClick={() => navigate(RoutesEnum.Root)}
      />,
    ),
    getItem('Cadastros', 'submenu1', <Icon component="InboxOutlined" />, [
      getItem(
        <Typography.Link onClick={() => navigate(RoutesEnum.Clients)}>
          Clientes
        </Typography.Link>,
        '2',
      ),
      getItem(
        <Typography.Link onClick={() => navigate(RoutesEnum.Products)}>
          Produtos
        </Typography.Link>,
        '3',
      ),
      getItem(
        <Typography.Link onClick={() => navigate(RoutesEnum.Suppliers)}>
          Fornecedores
        </Typography.Link>,
        '4',
      ),
    ]),
    getItem(
      'Financeiro',
      'submenu2',
      <Icon component="MoneyCollectOutlined" />,
      [
        getItem(
          <Typography.Link onClick={() => navigate(RoutesEnum.BillsToPay)}>
            Contas a pagar
          </Typography.Link>,
          '5',
        ),
        getItem(
          <Typography.Link onClick={() => navigate(RoutesEnum.BillsToReceive)}>
            Contas a receber
          </Typography.Link>,
          '6',
        ),
      ],
    ),
    getItem(
      <Typography.Link onClick={() => navigate(RoutesEnum.Configs)}>
        Configurações
      </Typography.Link>,
      'submenu3',
      <Icon
        component="ToolOutlined"
        onClick={() => navigate(RoutesEnum.Configs)}
      />,
    ),
    getItem('Vendas', 'submenu4', <Icon component="TagOutlined" />, [
      getItem(
        <Typography.Link onClick={() => navigate(RoutesEnum.Sales)}>
          Nova venda
        </Typography.Link>,
        '7',
      ),
      getItem(
        <Typography.Link onClick={() => navigate(RoutesEnum.SalesMade)}>
          Vendas
        </Typography.Link>,
        '8',
      ),
    ]),
    getItem('Orçamentos', 'submenu5', <Icon component="CalculatorOutlined" />, [
      getItem(
        <Typography.Link onClick={() => navigate(RoutesEnum.Budget)}>
          Novo orçamento
        </Typography.Link>,
        '9',
      ),
      getItem(
        <Typography.Link onClick={() => navigate(RoutesEnum.BudgetMade)}>
          Orçamentos
        </Typography.Link>,
        '10',
      ),
    ]),
  ];

  return (
    <Layout.Sider
      width="12%"
      collapsible
      collapsed={collapsed}
      onCollapse={(value: boolean | ((prevState: boolean) => boolean)) =>
        setCollapsed(value)
      }
      breakpoint="xl"
      theme="light"
    >
      <Layout.Header className="flex items-center justify-center p-0 bg-white shadow-lg">
        {collapsed ? (
          <Typography.Link>L</Typography.Link>
        ) : (
          <Typography.Link>Logo</Typography.Link>
        )}
      </Layout.Header>

      <Menu mode="inline" items={items} />
    </Layout.Sider>
  );
}
