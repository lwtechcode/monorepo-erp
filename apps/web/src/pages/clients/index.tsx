import { Fragment, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import useClientsMutation from './hooks/useClientMutations';

import { ModalClient } from './components/modal-client';
import { ModalViewClient } from './components/modal-view-client';
import { initialValues } from './services';
import { ClientTypes, CreateClient, FilterClient, StateType } from './types';

import {
  Button,
  Dropdown,
  Flex,
  Grid,
  Icon,
  Input,
  Link,
  List,
  Space,
  Table,
  TableParams,
  Typography,
} from '@ant-ui/react';
import { RequestVerbEnum } from '../../enums';
import {
  formatAddress,
  formatCPF,
  formatPhone,
  formatRG,
} from '../../utils/formatters';
import { SortOrderType } from '../../utils/types';
import { useDataTable } from './hooks/useDataTable';

export function ClientsPage() {
  const [tableParams, setTableParams] = useState<TableParams<FilterClient>>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailsDataClient, setShowDetailsDataClient] = useState(false);

  const [isVisibleModalAddClient, setIsVisibleModalAddClient] = useState(false);
  const [stateClient, setStateClient] = useState<StateType>({
    type: RequestVerbEnum.POST,
    form: initialValues,
  });
  const [filterClients, setFilterClients] = useState<FilterClient>({
    textFilterByNameAndCpf: '',
    status: '',
    ordered: '',
  });

  const debounceSearchTerm = useDebounce(
    filterClients?.textFilterByNameAndCpf || '',
  );

  const { useBreakpoint } = Grid.Root;

  const screens = useBreakpoint();

  const {
    clients,
    isLoading,
    mutateReport,
    mutateAddClient,
    mutateUpdateClient,
  } = useClientsMutation({
    filterClients,
    debounceSearchTerm,
    selectedPage: screens.md
      ? (tableParams?.pagination?.current as number)
      : currentPage,
    setIsVisibleModalAddClient,
  });

  function handleOrderedList(orderType: 'name' | 'createdAt') {
    return setFilterClients((prevState) => ({
      ...prevState,
      ordered: orderType,
    }));
  }

  function handleClearFilters() {
    return setFilterClients({
      textFilterByNameAndCpf: '',
      status: '',
      ordered: '',
    });
  }

  function handleTableChange(pagination: any, filters: any, sorter: any) {
    const orderCreatedDate: { [key in SortOrderType]?: () => void } = {
      ascend: () => handleOrderedList('createdAt'),
      descend: () => handleClearFilters(),
    };

    const orderName: { [key in SortOrderType]?: () => void } = {
      ascend: () => handleOrderedList('name'),
      descend: () => handleClearFilters(),
    };

    if (sorter.columnKey?.includes('createdAt')) {
      // Checa se a ordem do sorter está definida e se existe uma função correspondente no mapeamento
      const orderAction = orderCreatedDate[sorter.order as SortOrderType];

      orderAction ? orderAction() : null; // Executa a função correspondente
    }

    if (sorter.columnKey?.includes('name')) {
      // Checa se a ordem do sorter está definida e se existe uma função correspondente no mapeamento
      const orderAction = orderName[sorter.order as SortOrderType];

      orderAction ? orderAction() : null; // Executa a função correspondente
    }

    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      return [];
    }
  }

  const IS_LOADING = isLoading;

  const EMPTY_LIST = Boolean(clients?.clients.length);

  function handleFilterApply() {
    return Boolean(filterClients.status);
  }

  function handleOrderApply() {
    return (
      Boolean(filterClients.ordered) ||
      Boolean(filterClients.textFilterByNameAndCpf)
    );
  }

  function handleAddClient(client: CreateClient) {
    return mutateAddClient(client);
  }

  function handleUpdateClient(client: CreateClient & { id: string }) {
    return mutateUpdateClient(client);
  }

  function updateClientAction(client: ClientTypes) {
    return setStateClient({
      type: RequestVerbEnum.PUT,
      form: {
        id: client.id,
        address: client.address,
        birthDate: client.birthDate,
        cep: client.cep,
        city: client.city,
        complement: client.complement,
        cpf: client.cpf,
        email: client.email,
        name: client.name,
        neighborhood: client.neighborhood,
        number: client.number,
        observation: client.observation,
        gender: client.gender,
        phone: client.phone,
        rg: client.rg,
        state: client.state,
        active: Boolean(client.active),
      },
    });
  }

  const { columns, data } = useDataTable({
    clients: clients?.clients,
    handleUpdateClient: updateClientAction,
    handleFilterClients: setFilterClients,
    handleModalEditClient: setIsVisibleModalAddClient,
  });

  return (
    <Flex className="h-full" justify="center" vertical>
      <Typography.Title level={4}>Clientes</Typography.Title>

      <Flex gap={12}>
        <Input
          placeholder="Pesquise por nome ou CPF"
          onChange={({ target }) => {
            setFilterClients((prevState) => ({
              ...prevState,
              textFilterByNameAndCpf: target.value,
            }));
          }}
          value={filterClients.textFilterByNameAndCpf}
          allowClear
        />

        {screens.md ? (
          <Fragment>
            {handleFilterApply() || handleOrderApply() ? (
              <Button onClick={handleClearFilters} type="dashed">
                <Icon component="ClearOutlined" />
                {handleOrderApply() ? 'Limpar' : 'Limpar filtros'}
              </Button>
            ) : null}

            {EMPTY_LIST ? (
              <Button
                onClick={() => {
                  mutateReport();
                }}
                loading={isLoading}
                type="primary"
              >
                <Icon component="DownloadOutlined" />
                Gerar relatório
              </Button>
            ) : null}

            <Button
              onClick={() => {
                setStateClient({
                  form: initialValues,
                  type: RequestVerbEnum.POST,
                });
                setIsVisibleModalAddClient(true);
              }}
              type="primary"
            >
              <Icon component="PlusOutlined" />
              Novo
            </Button>
          </Fragment>
        ) : (
          <Flex>
            <Space>
              <Button
                onClick={() => {
                  setStateClient({
                    form: initialValues,
                    type: RequestVerbEnum.POST,
                  });
                  setIsVisibleModalAddClient(true);
                }}
                type="primary"
              >
                <Icon component="PlusOutlined" />
                Novo
              </Button>

              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <Fragment>
                          {EMPTY_LIST ? (
                            <Link
                              onClick={() => {
                                mutateReport();
                              }}
                              loading={isLoading}
                              variant="dashed"
                            >
                              <Icon component="DownloadOutlined" />
                              Gerar relatório
                            </Link>
                          ) : (
                            <Typography.Text>
                              Não há opções a ser exibida! Não foi encontrado
                              clientes!
                            </Typography.Text>
                          )}
                        </Fragment>
                      ),
                      type: 'item',
                      key: 'generate-report',
                    },
                  ],
                }}
                trigger={['click']}
              >
                <Icon className="text-xl" component="EllipsisOutlined" />
              </Dropdown>
            </Space>
          </Flex>
        )}
      </Flex>

      {screens.md ? (
        <Flex className="h-full" justify="start" vertical rootClassName="mt-4">
          <Table
            columns={columns}
            dataSource={data as any}
            loading={IS_LOADING}
            expandable={{
              expandedRowRender: (record: ClientTypes) => {
                const dataClientViewd = clients?.clients.find(
                  ({ id }) => record.id === id,
                );

                return (
                  <Grid.Row className="bg-zinc-200 gap-[24px] p-[8px] rounded-lg">
                    <Grid.Col>
                      <Typography.Paragraph>
                        Endereço: {formatAddress(dataClientViewd)}
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        Telefone:{' '}
                        {formatPhone(dataClientViewd?.phone as string) || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        RG: {formatRG(dataClientViewd?.rg as string) || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        Observação: {dataClientViewd?.observation || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>
                  </Grid.Row>
                );
              },
            }}
            size="small"
            pagination={{
              ...tableParams.pagination,
              total: clients?.totalCount,
              showTotal: (total) => (
                <Flex gap={4}>
                  <Typography.Text className="font-bold">
                    Total de Registros:
                  </Typography.Text>
                  <Typography.Text>{total || 0}</Typography.Text>
                </Flex>
              ),
            }}
            onChange={handleTableChange}
          />
        </Flex>
      ) : (
        <Flex className="w-full" vertical>
          <List
            itemLayout="horizontal"
            loading={isLoading}
            dataSource={clients?.clients}
            pagination={{
              current: currentPage,
              onChange: (page) => {
                setCurrentPage(page);
              },
              pageSize: 20,
              total: clients?.totalCount,
            }}
            renderItem={(item) => (
              <List.Item
                key={item.cpf}
                actions={[
                  <Flex align="center" justify="center">
                    <Button
                      type="text"
                      onClick={() => {
                        const clientSelected = clients?.clients?.find(
                          ({ id }) => {
                            return item.id === id;
                          },
                        );

                        clientSelected
                          ? updateClientAction({ ...clientSelected })
                          : null;

                        setIsVisibleModalAddClient(true);
                      }}
                    >
                      <Icon component="EditOutlined" />
                    </Button>

                    <Button
                      type="text"
                      onClick={() => {
                        const clientSelected = clients?.clients?.find(
                          ({ id }) => {
                            return item.id === id;
                          },
                        );

                        clientSelected
                          ? updateClientAction({ ...clientSelected })
                          : null;

                        return setShowDetailsDataClient(true);
                      }}
                    >
                      <Icon component="EyeOutlined" />
                    </Button>
                  </Flex>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={formatCPF(item.cpf) || '-'}
                />
              </List.Item>
            )}
          />
        </Flex>
      )}

      <ModalClient
        isLoading={isLoading}
        form={stateClient.form}
        type={stateClient.type}
        handleAddClient={handleAddClient}
        handleUpdateClient={handleUpdateClient}
        isVisibleModalAddClient={isVisibleModalAddClient}
        onClose={() => setIsVisibleModalAddClient(false)}
      />

      <ModalViewClient
        isVisibleModalViewClient={showDetailsDataClient}
        onClose={() => setShowDetailsDataClient(false)}
        clientSelected={stateClient.form}
      />
    </Flex>
  );
}
