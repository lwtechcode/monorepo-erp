import { Button, Flex, Icon, Menu, Space, Typography } from '@ant-ui/react';
import { Radio, TableColumnsType } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import { FilterProductCategory } from '../types';

type ProductCategory = {
  id: string;
  name: string;
  observation?: string;
  active: boolean;
};

type DataTableProductCategoriesTypes = {
  productCategories?: Array<ProductCategory>;
  handleUpdateProductCategories?: (paymentMethodsData: ProductCategory) => void;
  handleFilterProductCategories?: Dispatch<
    SetStateAction<FilterProductCategory>
  >;
};

type RenderFilterStatusProps = {
  handleFilterProductCategories?: Dispatch<
    SetStateAction<FilterProductCategory>
  >;
};

function renderFilterStatus({
  handleFilterProductCategories,
}: RenderFilterStatusProps) {
  const [filterValue, setFilterValue] = useState();

  function handleApplyFilter() {
    handleFilterProductCategories
      ? handleFilterProductCategories((prevState) => ({
          ...prevState,
          status: filterValue,
        }))
      : null;
  }

  function handleClearFilter() {
    handleFilterProductCategories
      ? handleFilterProductCategories((prevState) => ({
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

export default function useDataTable({
  productCategories,
  handleFilterProductCategories,
  handleUpdateProductCategories,
}: DataTableProductCategoriesTypes) {
  const columns: TableColumnsType<ProductCategory> = [
    {
      key: 'name',
      title: 'Nome',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      showSorterTooltip: { title: 'Ordenar por nome' },
      ellipsis: true,
    },
    {
      key: 'observation',
      title: 'Observação',
      dataIndex: 'observation',
      ellipsis: true,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      ellipsis: true,
      filterMode: 'menu',
      filterMultiple: false,
      filterDropdown: renderFilterStatus({ handleFilterProductCategories }),
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
              const productCategoriesSelected = productCategories?.find(
                ({ id }) => {
                  return record.id === id;
                },
              );

              return handleUpdateProductCategories && productCategoriesSelected
                ? handleUpdateProductCategories({
                    ...productCategoriesSelected,
                  })
                : null;
            }}
          >
            <Icon component="EditOutlined" />
          </Button>
        </Flex>
      ),
    },
  ];

  const data = productCategories?.map((productCategorie, index) => ({
    key: productCategorie.id,
    id: productCategorie.id,
    name: productCategorie.name || '-',
    observation: productCategorie.observation || '-',
    status: productCategorie.active ? (
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
