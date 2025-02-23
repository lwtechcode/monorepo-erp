import { Button, Flex, Icon, Menu, Space, Typography } from '@ant-ui/react';
import { Radio, TableColumnsType } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import { formatCPF, formatDate } from '../../../utils/formatters';
import { renderGender, renderGenderType } from '../../../utils/functions';
import { ClientTypes, FilterClient } from '../types';

type DataTableClientTypes = {
  clients?: Array<ClientTypes>;
  handleUpdateClient?: (clientData: ClientTypes) => void;
  handleFilterClients?: Dispatch<SetStateAction<FilterClient>>;
  handleModalEditClient?: Dispatch<SetStateAction<boolean>>;
};

type RenderFilterStatusProps = {
  handleFilterClients?: Dispatch<SetStateAction<FilterClient>>;
};

function renderFilterStatus({ handleFilterClients }: RenderFilterStatusProps) {
  const [filterValue, setFilterValue] = useState();

  function handleApplyFilter() {
    handleFilterClients
      ? handleFilterClients((prevState) => ({
          ...prevState,
          status: filterValue,
        }))
      : null;
  }

  function handleClearFilter() {
    handleFilterClients
      ? handleFilterClients((prevState) => ({
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
  clients,
  handleUpdateClient,
  handleFilterClients,
  handleModalEditClient,
}: DataTableClientTypes) {
  const columns: TableColumnsType<ClientTypes> = [
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
      key: 'cpf',
      title: 'CPF',
      dataIndex: 'cpf',
      width: '20%',
      ellipsis: true,
    },
    {
      key: 'birthDate',
      title: 'Data de nascimento',
      dataIndex: 'birthDate',
      width: '20%',
      ellipsis: true,
    },
    {
      key: 'createdAt',
      title: 'Data de cadastro',
      dataIndex: 'createdAt',
      sorter: {},
      showSorterTooltip: { title: 'Ordenar por data de cadastro' },
      width: '20%',
      ellipsis: true,
    },
    {
      key: 'email',
      title: 'E-mail',
      dataIndex: 'email',
      width: '20%',
      ellipsis: true,
    },
    {
      key: 'gender',
      title: 'Gênero',
      dataIndex: 'gender',
      width: '10%',
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
      filterDropdown: renderFilterStatus({ handleFilterClients }),
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
              const clientSelected = clients?.find(({ id }) => {
                return record.id === id;
              });

              handleUpdateClient && clientSelected
                ? handleUpdateClient({ ...clientSelected })
                : null;

              return handleModalEditClient ? handleModalEditClient(true) : null;
            }}
          >
            <Icon component="EditOutlined" />
          </Button>
        </Flex>
      ),
      width: '20%',
    },
  ];

  const data = clients?.map((client) => ({
    key: client.id,
    id: client.id,
    name: client.name || '-',
    cpf: formatCPF(client.cpf) || '-',
    birthDate: formatDate(client.birthDate) || '-',
    createdAt: formatDate(client.created_at) || '-',
    email: client.email || '-',
    gender: renderGender(client.gender as renderGenderType) || '-',
    status: client.active ? (
      <Typography.Text type="success">Ativado</Typography.Text>
    ) : (
      <Typography.Text type="danger">Desativado</Typography.Text>
    ),
  }));

  return { columns, data };
}
