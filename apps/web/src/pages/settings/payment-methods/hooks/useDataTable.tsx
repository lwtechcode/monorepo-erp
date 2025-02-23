import { Button, Flex, Icon, Menu, Space, Typography } from '@ant-ui/react';
import { Radio, TableColumnsType } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import { FilterPaymentMethods } from '../types';

type PaymentMethod = {
  id: string;
  name: string;
  observation?: string;
  tax: string;
  active: boolean;
};

type RenderFilterStatusProps = {
  handleFilterPaymentMethods?: Dispatch<SetStateAction<FilterPaymentMethods>>;
};

function renderFilterStatus({
  handleFilterPaymentMethods,
}: RenderFilterStatusProps) {
  const [filterValue, setFilterValue] = useState();

  function handleApplyFilter() {
    handleFilterPaymentMethods
      ? handleFilterPaymentMethods((prevState) => ({
          ...prevState,
          status: filterValue,
        }))
      : null;
  }

  function handleClearFilter() {
    handleFilterPaymentMethods
      ? handleFilterPaymentMethods((prevState) => ({
          ...prevState,
          status: undefined,
        }))
      : null;

    setFilterValue(undefined);
  }

  return (
    <Menu>
      <Space className="px-2 py-3" direction="vertical">
        <Radio.Group
          value={filterValue}
          onChange={(value) => setFilterValue(value.target.value)}
        >
          <Space direction="vertical">
            <Radio value="ativo">Ativo</Radio>
            <Radio value="inativo">Inativo</Radio>
          </Space>
        </Radio.Group>

        <Space>
          <Button onClick={handleClearFilter}>Limpar</Button>

          <Button type="primary" onClick={handleApplyFilter}>
            Aplicar
          </Button>
        </Space>
      </Space>
    </Menu>
  );
}

type DataTablePaymentMethodsTypes = {
  paymentMethods?: Array<PaymentMethod>;
  handleUpdatePaymentMethods?: (paymentMethodsData: PaymentMethod) => void;
  handleFilterPaymentMethods?: Dispatch<SetStateAction<FilterPaymentMethods>>;
};

export default function useDataTable({
  paymentMethods,
  handleUpdatePaymentMethods,
  handleFilterPaymentMethods,
}: DataTablePaymentMethodsTypes) {
  const columns: TableColumnsType<PaymentMethod> = [
    {
      key: 'name',
      title: 'Nome',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      showSorterTooltip: { title: 'Ordenar por nome' },
      ellipsis: true,
      width: '20%',
    },
    {
      key: 'tax',
      title: 'Taxa',
      dataIndex: 'tax',
      width: '20%',
      ellipsis: true,
    },
    {
      key: 'observation',
      title: 'Observação',
      dataIndex: 'observation',
      width: '20%',
      ellipsis: true,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      ellipsis: true,
      filterMode: 'menu',
      filterMultiple: false,
      filterDropdown: renderFilterStatus({ handleFilterPaymentMethods }),
      filters: [
        {
          text: 'Ativo',
          value: 'ativo',
        },
        {
          text: 'Inativo',
          value: 'inativo',
        },
      ],
    },
    {
      title: 'Ações',
      dataIndex: '',
      key: 'x',
      align: 'center',
      render: (_, record) => (
        <Flex align="center" justify="center">
          <Button
            type="text"
            onClick={() => {
              const paymentSelected = paymentMethods?.find(({ id }) => {
                return record.id === id;
              });

              return handleUpdatePaymentMethods && paymentSelected
                ? handleUpdatePaymentMethods({ ...paymentSelected })
                : null;
            }}
          >
            <Icon component="EditOutlined" />
          </Button>
        </Flex>
      ),
      width: '20%',
    },
  ];

  const data = paymentMethods?.map((paymentMethod, index) => ({
    key: paymentMethod.id,
    id: paymentMethod.id,
    name: paymentMethod.name || '-',
    tax: paymentMethod.tax || '-',
    observation: paymentMethod.observation || '-',
    status: paymentMethod.active ? (
      <Typography.Text type="success">Ativado</Typography.Text>
    ) : (
      <Typography.Text type="danger">Desativado</Typography.Text>
    ),
  }));

  return {
    columns,
    data,
  };
}
