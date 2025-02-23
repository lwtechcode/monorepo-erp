import { Button, Flex, Icon, Menu, Space, Typography } from '@ant-ui/react';
import { Radio, TableColumnsType } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import { FilterProduct, ProductResponseType, ProductType } from '../types';

import { formatMoney } from '../../../utils/formatters';

type DataTableProductTypes = {
  products?: Array<ProductResponseType>;
  handleRemoveProduct?: () => void;
  handleUpdateProduct?: (ProductData: ProductResponseType) => void;
  handleFilterProducts?: Dispatch<SetStateAction<Partial<FilterProduct>>>;
};

function renderFilterStatus({
  handleFilterProducts,
}: Pick<DataTableProductTypes, 'handleFilterProducts'>) {
  const [filterValue, setFilterValue] = useState();

  function handleApplyFilter() {
    handleFilterProducts
      ? handleFilterProducts((prevState) => ({
          ...prevState,
          status: filterValue,
        }))
      : null;
  }

  function handleClearFilter() {
    handleFilterProducts
      ? handleFilterProducts((prevState) => ({
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

export function useDataTable({
  products,
  handleUpdateProduct,
  handleFilterProducts,
}: DataTableProductTypes) {
  const columns: TableColumnsType<ProductType> = [
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
      key: 'cost_price',
      title: 'Preço de custo',
      dataIndex: 'cost_price',
    },
    {
      key: 'sale_price',
      title: 'Preço de venda',
      dataIndex: 'sale_price',
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      ellipsis: true,
      filterMode: 'menu',
      filterMultiple: false,
      filterDropdown: renderFilterStatus({ handleFilterProducts }),
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
              const productSelected = products?.find(({ id }) => {
                return record.id === id;
              });

              return handleUpdateProduct && productSelected
                ? handleUpdateProduct({ ...productSelected })
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

  const data = products?.map((product) => ({
    key: product.id,
    id: product.id,
    name: product?.name || '-',
    cost_price: formatMoney(product.cost_price) || '-',
    sale_price: formatMoney(product.sale_price) || '-',
    status: product.active ? (
      <Typography.Text type="success">Ativado</Typography.Text>
    ) : (
      <Typography.Text type="danger">Desativado</Typography.Text>
    ),
  }));

  return { columns, data };
}
