import {
  Avatar,
  Dropdown,
  Grid,
  Icon,
  Layout,
  Space,
  Typography,
} from '@ant-ui/react';

import './styles.css';

export function Header({
  userName,
  menuItems,
}: {
  userName: string;
  menuItems: any[];
}) {
  const { useBreakpoint } = Grid.Root;

  const screens = useBreakpoint();

  return (
    <Layout.Header className="header">
      <Space size="middle">
        {screens.md ? <Typography.Text>{userName}</Typography.Text> : null}

        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          <Avatar
            onClick={(event) => {
              event?.preventDefault();
            }}
            className="cursor-pointer"
            shape="circle"
            size={46}
            icon={
              <Icon
                component="UserOutlined"
                style={{ color: 'white', cursor: 'pointer' }}
              />
            }
          />
        </Dropdown>
      </Space>
    </Layout.Header>
  );
}
