import { Flex, Tabs, Typography } from '@ant-ui/react';
import PaymentMethods from './payment-methods';
import ProductCategories from './product-categories';
import UnitOfMeasurementTab from './unit-of-measurement';

const ITEMS_TABS = [
  {
    key: '1',
    label: 'Métodos de Pagamento',
    children: <PaymentMethods />,
  },
  {
    key: '2',
    label: 'Categorias de Produtos',
    children: <ProductCategories />,
  },
  {
    key: '3',
    label: 'Unidades de Medidas',
    children: <UnitOfMeasurementTab />,
  },
];

export function SettingsPage() {
  return (
    <Flex className="h-full" justify="center" vertical>
      <Typography.Title level={4}>Configurações</Typography.Title>

      <Typography.Text>
        Personalize e gerencie as configurações do sistema. Adicione ou altere
        uma variedade de opções conforme necessário para adaptar o sistema às
        suas preferências e requisitos.
      </Typography.Text>

      <Flex className="h-full" justify="start" vertical>
        <Tabs items={ITEMS_TABS} />
      </Flex>
    </Flex>
  );
}
