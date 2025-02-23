import { Fragment, useState } from 'react';

import useDebounce from '../../hooks/useDebounce';

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
import { ModalBillToReceive } from './components/modal-bill-to-receive';
import useBillToReceiveMutation from './hooks/useBillToReceiveMutations';
import { INITIAL_VALUES } from './services';
import {
  BillToReceive,
  FilterBillToReceive,
  FormBillToReceive,
  StateType,
} from './types';

import { useDataTable } from './hooks/useDataTable';

export function BillsToReceivePage() {
  const [tableParams, setTableParams] = useState<TableParams<any>>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  const [isVisibleModalAddBillToReceive, setIsVisibleModalAddBillToReceive] =
    useState(false);
  const [stateBillToReceive, setStateBillToReceive] = useState<StateType>({
    type: RequestVerbEnum.POST,
    form: INITIAL_VALUES,
  });
  const [filterBillToReceive, setFilterBillToReceive] =
    useState<FilterBillToReceive>({
      description: '',
      status: '',
      endDate: '',
      startDate: '',
    });

  const debounceSearchTerm = useDebounce(filterBillToReceive.description);

  const {
    mutateReport,
    billsToReceive,
    clientsOptions,
    isLoadingBillsToPay,
    mutateAddBillToReceive,
    mutateUpdateBillToReceive,
  } = useBillToReceiveMutation({
    filterBillToReceive,
    debounceSearchTerm,
    selectedPage: tableParams?.pagination?.current as number,
    setIsVisibleModalAddBillToReceive,
  });

  const isLoading = isLoadingBillsToPay;

  const EMPTY_LIST =
    billsToReceive?.billsToReceive && billsToReceive.billsToReceive.length;

  function handleAddClient(billToReceive: FormBillToReceive) {
    mutateAddBillToReceive(billToReceive);
  }

  function handleUpdateClient(
    billToReceive: FormBillToReceive & { id: string },
  ) {
    mutateUpdateBillToReceive(billToReceive);
  }

  function handleClearFilters() {
    setFilterBillToReceive({
      description: '',
      status: '',
      endDate: '',
      startDate: '',
    });
  }

  function updateBillToReceiveAction(billToReceive: BillToReceive) {
    const PAYLOAD = {
      client_id: billToReceive?.client_id,
      description: billToReceive?.description,
      due_date: billToReceive?.due_date,
      observation: billToReceive?.observation,
      value: String(billToReceive.value),
      id: billToReceive.id,
    };

    setStateBillToReceive({
      type: RequestVerbEnum.PUT,
      form: PAYLOAD,
    });

    setIsVisibleModalAddBillToReceive(true);
  }

  function handleFilterApply() {
    return (
      Boolean(filterBillToReceive.status) ||
      Boolean(filterBillToReceive.description) ||
      Boolean(filterBillToReceive.startDate) ||
      Boolean(filterBillToReceive.endDate)
    );
  }

  const { columns, data } = useDataTable({
    billToReceive: billsToReceive?.billsToReceive,
    handleUpdateBillToReceive: updateBillToReceiveAction,
    handleFilterBillToReceives: setFilterBillToReceive,
  });

  return (
    <Flex className="h-full" justify="center" vertical>
      <Typography.Title level={4}>Contas a receber</Typography.Title>

      <Flex gap={12}>
        <Input
          placeholder="Pesquise por descrição"
          onChange={({ target }) => {
            setFilterBillToReceive((prevState) => ({
              ...prevState,
              description: target.value,
            }));
          }}
          value={filterBillToReceive.description}
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
                description: filterBillToReceive.description,
                startDate: filterBillToReceive.startDate,
                endDate: filterBillToReceive.endDate,
              });
            }}
            type="primary"
          >
            <Icon component="DownloadOutlined" />
            Gerar relatório
          </Button>
        ) : null}

        <Button
          onClick={() => {
            setStateBillToReceive({
              form: INITIAL_VALUES,
              type: RequestVerbEnum.POST,
            });
            setIsVisibleModalAddBillToReceive(true);
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
            pagination={{
              ...tableParams.pagination,
              total: billsToReceive?.totalCount,
              showTotal: (total) => (
                <Flex gap={4}>
                  <Typography.Text className="font-bold">
                    Total de Registros:
                  </Typography.Text>
                  <Typography.Text>{total || 0}</Typography.Text>
                </Flex>
              ),
            }}
          />
        </Fragment>
      </Flex>

      <ModalBillToReceive
        form={stateBillToReceive.form}
        handleAddBillToReceive={handleAddClient}
        handleUpdateBillToReceive={handleUpdateClient}
        type={stateBillToReceive.type}
        isVisibleModalBillToReceive={isVisibleModalAddBillToReceive}
        onClose={() => setIsVisibleModalAddBillToReceive(false)}
        clientsOptions={clientsOptions}
      />
    </Flex>
  );
}
