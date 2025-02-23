import { Fragment, useState } from 'react';

import useDebounce from '../../hooks/useDebounce';
import { useDataTable } from './hooks';
import useBillToPayMutation from './hooks/useBillToPayMutations';

import {
  Button,
  Flex,
  Icon,
  Input,
  Table,
  TableParams,
  Typography,
} from '@ant-ui/react';
import { RequestVerbEnum } from '../../enums';
import { SortOrderType } from '../../utils/types';
import { ModalBillToPay } from './components/modal-bill-to-pay';
import { initialValues } from './services';
import { FilterBillToPay, FormBillToPay, StateType } from './types';

export function BillsToPayPage() {
  const [tableParams, setTableParams] = useState<TableParams<any>>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  const [isVisibleModalBillToPay, setIsVisibleModalBillToPay] = useState(false);
  const [stateBillToPay, setStateBillToPay] = useState<StateType>({
    type: RequestVerbEnum.POST,
    form: initialValues,
  });
  const [filterBillToPay, setFilterBillToPay] = useState<FilterBillToPay>({
    description: '',
    status: '',
    endDate: '',
    startDate: '',
  });

  const debounceSearchTerm = useDebounce(filterBillToPay.description);

  const {
    billsToPay,
    mutateReport,
    isLoadingBillsToPay,
    mutateAddBillToPay,
    mutateUpdateBillToPay,
  } = useBillToPayMutation({
    filterBillToPay,
    debounceSearchTerm,
    selectedPage: tableParams?.pagination?.current as number,
    setIsVisibleModalAddBillToPay: setIsVisibleModalBillToPay,
  });

  function handleAddBillToPay(billToPay: FormBillToPay) {
    return mutateAddBillToPay(billToPay);
  }

  function handleClearFilters() {
    setFilterBillToPay({
      description: '',
      status: '',
      endDate: '',
      startDate: '',
    });
  }

  function handleUpdateBillToPay(billToPay: FormBillToPay & { id: string }) {
    return mutateUpdateBillToPay(billToPay);
  }

  function updateBillToPayAction(billToPay: FormBillToPay) {
    setStateBillToPay({
      type: RequestVerbEnum.PUT,
      form: {
        creditor: billToPay.creditor,
        description: billToPay.description,
        due_date: billToPay.due_date,
        observation: billToPay.observation,
        pay_date: billToPay.pay_date,
        value: billToPay.value,
        id: billToPay.id,
      },
    });

    return setIsVisibleModalBillToPay(true);
  }

  const { columns, data } = useDataTable({
    billToPays: billsToPay?.billsToPay,
    handleUpdateBillToPay: updateBillToPayAction,
    handleFilterBillToPays: setFilterBillToPay,
  });

  function handleFilterApply() {
    return (
      Boolean(filterBillToPay.status) ||
      Boolean(filterBillToPay.description) ||
      Boolean(filterBillToPay.startDate) ||
      Boolean(filterBillToPay.endDate)
    );
  }

  function handleTableChange(pagination: any, filters: any, sorter: any) {
    const orderCreatedDate: { [key in SortOrderType]?: () => void } = {
      // ascend: () => handleOrderedList('createdAt'),
      descend: () => handleClearFilters(),
    };

    const orderName: { [key in SortOrderType]?: () => void } = {
      // ascend: () => handleOrderedList('name'),
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

  const EMPTY_LIST = Boolean(billsToPay?.billsToPay?.length);

  const isLoading = isLoadingBillsToPay;

  return (
    <Flex className="h-full" justify="center" vertical>
      <Typography.Title level={4}>Contas a pagar</Typography.Title>

      <Flex gap={12}>
        <Input
          placeholder="Pesquise por descrição"
          onChange={({ target }) => {
            setFilterBillToPay((prevState) => ({
              ...prevState,
              description: target.value,
            }));
          }}
          value={filterBillToPay.description}
          allowClear
        />

        {handleFilterApply() ? (
          <Button onClick={handleClearFilters} type="dashed">
            <Icon component="ClearOutlined" />
            Limpar filtros
          </Button>
        ) : null}

        {EMPTY_LIST ? (
          <Button
            onClick={() => {
              mutateReport({
                description: filterBillToPay.description,
                startDate: filterBillToPay.startDate,
                endDate: filterBillToPay.endDate,
              });
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
            setStateBillToPay({
              form: initialValues,
              type: RequestVerbEnum.POST,
            });
            setIsVisibleModalBillToPay(true);
          }}
          type="primary"
        >
          <Icon component="PlusOutlined" />
          Novo
        </Button>
      </Flex>

      <Flex className="h-full" justify="start" vertical rootClassName="mt-4">
        <Fragment>
          <Table
            columns={columns as any}
            dataSource={data}
            loading={isLoading}
            size="small"
            onChange={handleTableChange}
            pagination={{
              ...tableParams.pagination,
              total: billsToPay?.totalCount,
              showTotal: (total) => (
                <Flex gap={4}>
                  <Typography.Text className="font-bold">
                    Total de Registros:
                  </Typography.Text>
                  <Typography.Text>{total || 0}</Typography.Text>
                </Flex>
              ),
            }}
          >
            <Table.Column
              title="Action"
              key="action"
              render={(_: any, record: any) => (
                <Icon component="AccountBookOutlined" />
              )}
            />
          </Table>
        </Fragment>
      </Flex>

      <ModalBillToPay
        isLoading={isLoading}
        form={stateBillToPay.form}
        type={stateBillToPay.type}
        handleAddBillToPay={handleAddBillToPay}
        handleUpdateBillToPay={handleUpdateBillToPay}
        isVisibleModalBillToPay={isVisibleModalBillToPay}
        onClose={() => setIsVisibleModalBillToPay(false)}
      />
    </Flex>
  );
}
