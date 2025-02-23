import { Button, Flex, Icon, Menu, Space, Typography } from '@ant-ui/react';
import { formatCNPJ, formatPhone } from '../../../utils/formatters';

type DataTableSuppliersTypes = {
  suppliers?: Array<SupplierType>;
  handleRemoveSupplier?: () => void;
  handleUpdateSupplier?: (SupplierData: SupplierType) => void;
  handleFilterSuppliers?: Dispatch<SetStateAction<Partial<FilterSuppliers>>>;
};

import { Radio, TableColumnsType } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import { FilterSuppliers, SupplierType } from '../types';

function renderFilterStatus({
  handleFilterSuppliers,
}: Pick<DataTableSuppliersTypes, 'handleFilterSuppliers'>) {
  const [filterValue, setFilterValue] = useState();

  function handleApplyFilter() {
    handleFilterSuppliers
      ? handleFilterSuppliers((prevState) => ({
          ...prevState,
          status: filterValue,
        }))
      : null;
  }

  function handleClearFilter() {
    handleFilterSuppliers
      ? handleFilterSuppliers((prevState) => ({
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
  suppliers,
  handleUpdateSupplier,
  handleFilterSuppliers,
}: DataTableSuppliersTypes) {
  const columns: TableColumnsType<SupplierType> = [
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
      key: 'cnpj',
      title: 'CNPJ',
      dataIndex: 'cnpj',
      ellipsis: true,
    },
    {
      key: 'email',
      title: 'E-mail',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      key: 'phone',
      title: 'Telefone',
      dataIndex: 'phone',
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
      filterDropdown: renderFilterStatus({ handleFilterSuppliers }),
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
              const supplierSelected = suppliers?.find(({ id }) => {
                return record.id === id;
              });

              return handleUpdateSupplier && supplierSelected
                ? handleUpdateSupplier({ ...supplierSelected })
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

  const data = suppliers?.map((supplier) => ({
    key: supplier.id,
    id: supplier.id,
    name: supplier.name || '-',
    email: supplier.email || '-',
    active: supplier.active,
    cep: supplier.cep,
    address: supplier.address,
    city: supplier.city,
    complement: supplier.complement,
    created_at: supplier.created_at,
    cnpj: formatCNPJ(supplier.cnpj as string) || '-',
    phone: formatPhone(supplier.phone as string) || '-',
    status: supplier.active ? (
      <Typography.Text type="success">Ativado</Typography.Text>
    ) : (
      <Typography.Text type="danger">Desativado</Typography.Text>
    ),
  }));

  return { columns, data };
}
