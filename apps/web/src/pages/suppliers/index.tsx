import { useState } from 'react';

import useDebounce from '../../hooks/useDebounce';

import {
  Button,
  Flex,
  Grid,
  Icon,
  Input,
  Table,
  TableParams,
  Typography,
} from '@ant-ui/react';
import { RequestVerbEnum } from '../../enums';
import { formatAddress } from '../../utils/formatters';
import { SortOrderType } from '../../utils/types';
import { ModalSupplier } from './components/modal-supplier';
import useDataTable from './hooks/useDataTable';
import useSuppliersMutation from './hooks/useSupplierMutations';
import { initialValues } from './services';
import {
  FilterSuppliers,
  FormSupplierType,
  StateType,
  SupplierType,
} from './types';

export function SuppliersPage() {
  const [tableParams, setTableParams] = useState<TableParams<any>>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  const [isVisibleModalAddSupplier, setIsVisibleModalAddSupplier] =
    useState(false);

  const [stateSupplier, setStateSupplier] = useState<StateType>({
    type: RequestVerbEnum.POST,
    form: initialValues,
  });
  const [filterSuppliers, setFilterSuppliers] = useState<
    Partial<FilterSuppliers>
  >({
    textFilterByNameAndCnpj: '',
    status: '',
    ordered: '',
  });

  const debounceSearchTerm = useDebounce(
    filterSuppliers.textFilterByNameAndCnpj as string,
  );

  const {
    suppliers,
    mutateReport,
    mutateAddSupplier,
    isLoadingSuppliers,
    mutateUpdateSupplier,
  } = useSuppliersMutation({
    filterSuppliers: filterSuppliers as FilterSuppliers,
    debounceSearchTerm,
    selectedPage: tableParams?.pagination?.current as number,
    setIsVisibleModalAddSupplier,
  });

  const isLoading = isLoadingSuppliers;

  const isEmptyList = Boolean(suppliers?.suppliers.length);

  function handleAddSupplier(supplier: FormSupplierType) {
    return mutateAddSupplier(supplier);
  }

  function handleClearFilters() {
    setFilterSuppliers({
      textFilterByNameAndCnpj: '',
      status: '',
      ordered: '',
    });
  }

  function handleFilterApply() {
    return Boolean(filterSuppliers.status);
  }

  function handleOrderApply() {
    return (
      Boolean(filterSuppliers.ordered) ||
      Boolean(filterSuppliers.textFilterByNameAndCnpj)
    );
  }

  function handleOrderedList(orderType: 'name' | 'createdAt') {
    setFilterSuppliers((prevState) => ({ ...prevState, ordered: orderType }));
  }

  function handleUpdateSupplier(supplier: FormSupplierType & { id: string }) {
    return mutateUpdateSupplier(supplier);
  }

  function updateSupplierAction(supplier: SupplierType) {
    setStateSupplier({
      type: RequestVerbEnum.PUT,
      form: {
        cnpj: supplier.cnpj,
        id: supplier.id,
        address: supplier.address,
        cep: supplier.cep,
        city: supplier.city,
        complement: supplier.complement,
        email: supplier.email,
        name: supplier.name,
        neighborhood: supplier.neighborhood,
        number: supplier.number,
        observation: supplier.observation,
        phone: supplier.phone,
        state: supplier.state,
        active: supplier.active,
      },
    });

    return setIsVisibleModalAddSupplier(true);
  }

  const { columns, data } = useDataTable({
    suppliers: suppliers?.suppliers,
    handleUpdateSupplier: updateSupplierAction,
    handleFilterSuppliers: setFilterSuppliers,
  });

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

  return (
    <Flex className="h-full" justify="center" vertical>
      <Typography.Title level={4}>Fornecedores</Typography.Title>

      <Flex gap={12}>
        <Input
          placeholder="Pesquise por nome ou CNPJ"
          onChange={({ target }) => {
            setFilterSuppliers((prevState) => ({
              ...prevState,
              textFilterByNameAndCnpj: target.value,
            }));
          }}
          value={filterSuppliers.textFilterByNameAndCnpj}
          allowClear
        />

        {handleFilterApply() || handleOrderApply() ? (
          <Button onClick={handleClearFilters} type="dashed">
            <Icon component="ClearOutlined" />
            {handleOrderApply() ? 'Limpar' : 'Limpar filtros'}
          </Button>
        ) : null}

        {isEmptyList ? (
          <Button
            onClick={() => {
              mutateReport();
            }}
            type="primary"
          >
            <Icon component="DownloadOutlined" />
            Gerar relatório
          </Button>
        ) : null}

        <Button
          onClick={() => {
            setStateSupplier({
              form: initialValues,
              type: RequestVerbEnum.POST,
            });

            setIsVisibleModalAddSupplier(true);
          }}
          type="primary"
        >
          <Icon component="PlusOutlined" />
          Novo
        </Button>
      </Flex>

      <Flex className="h-full" justify="start" vertical rootClassName="mt-4">
        <Table
          columns={columns as any}
          dataSource={data as any}
          loading={isLoading}
          size="small"
          pagination={{
            ...tableParams.pagination,
            total: suppliers?.totalCount,
            showTotal: (total) => (
              <Flex gap={4}>
                <Typography.Text className="font-bold">
                  Total de Registros:
                </Typography.Text>
                <Typography.Text>{total || 0}</Typography.Text>
              </Flex>
            ),
          }}
          expandable={{
            expandedRowRender: (record: SupplierType) => {
              const dataSupplier = suppliers?.suppliers.find(
                ({ id }) => record.id === id,
              );

              return (
                <Grid.Row className="bg-zinc-200 gap-[24px] p-[8px] rounded-lg">
                  <Grid.Col>
                    <Typography.Paragraph>
                      <Typography.Paragraph>
                        Endereço: {formatAddress(dataSupplier)}
                      </Typography.Paragraph>
                    </Typography.Paragraph>
                  </Grid.Col>

                  <Grid.Col>
                    <Typography.Paragraph>
                      Observação: {dataSupplier?.observation || '-'}
                    </Typography.Paragraph>
                  </Grid.Col>
                </Grid.Row>
              );
            },
          }}
          onChange={handleTableChange}
        >
          <Table.Column
            title="Action"
            key="action"
            render={(_: any, record: any) => (
              <Icon component="AccountBookOutlined" />
            )}
          />
        </Table>
      </Flex>

      <ModalSupplier
        form={stateSupplier.form}
        type={stateSupplier.type}
        handleAddSupplier={handleAddSupplier}
        handleUpdateSupplier={handleUpdateSupplier}
        onClose={() => setIsVisibleModalAddSupplier(false)}
        isVisibleModalAddSupplier={isVisibleModalAddSupplier}
      />
    </Flex>
  );
}
