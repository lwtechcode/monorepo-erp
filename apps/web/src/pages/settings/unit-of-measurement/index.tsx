import {
  Button,
  Flex,
  Icon,
  Input,
  Table,
  TableParams,
  Typography,
} from '@ant-ui/react';
import { useState } from 'react';
import { RequestVerbEnum } from '../../../enums';
import useDebounce from '../../../hooks/useDebounce';
import { SortOrderType } from '../../../utils/types';
import { ModalAddUnitOfMeasurement } from './components/modal-add-unit-of-measurement';
import {
  FormUnitOfMeasurement,
  StateType,
} from './components/modal-add-unit-of-measurement/types';
import useDataTable from './hooks/useDataTable';
import useUnitOfMeasurementMutation from './hooks/useUnitOfMeasurementMutations';
import { initialValues } from './services';
import { FilterUnitOfMeasurement, UnitOfMeasurement } from './types';

export default function UnitOfMeasurementTab() {
  const [stateUnitOfMeasurement, setStateUnitOfMeasurement] =
    useState<StateType>({
      type: RequestVerbEnum.POST,
      form: initialValues,
    });

  const [tableParams, setTableParams] = useState<TableParams<any>>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  const [
    isVisibleModalAddUnitOfMeasurement,
    setIsVisibleModalAddUnitOfMeasurement,
  ] = useState(false);

  const [filterUnitOfMeasurement, setFilterUnitOfMeasurement] =
    useState<FilterUnitOfMeasurement>({
      name: '',
      status: '',
      ordered: '',
    });

  const debounceSearchTerm = useDebounce(
    filterUnitOfMeasurement.name as string,
  );

  const {
    isFetchingUnitOfMeasurements,
    unitOfMeasurements,
    isFetchingAddUnitOfMeasurements,
    isFetchingUpdateUnitOfMeasurement,
    mutateAddUnitOfMeasurement,
    mutateUpdateUnitOfMeasurement,
  } = useUnitOfMeasurementMutation({
    debounceSearchTerm,
    filterUnitOfMeasurement,
    selectedPage: tableParams?.pagination?.current as number,
    setIsVisibleModalAddUnitOfMeasurement,
  });

  function updateUnitOfMeasurementAction(
    unitOfMeasurement: UnitOfMeasurement & { id: string },
  ) {
    setStateUnitOfMeasurement({
      type: RequestVerbEnum.PUT,
      form: {
        name: unitOfMeasurement.name,
        abbreviation: unitOfMeasurement.abbreviation || '',
        active: unitOfMeasurement?.active || false,
        id: unitOfMeasurement?.id,
      },
    });

    setIsVisibleModalAddUnitOfMeasurement(true);
  }

  const { columns, data } = useDataTable({
    unitOfMeasurements: unitOfMeasurements?.unitsMeasurements,
    handleUnitOfMeasurements: updateUnitOfMeasurementAction,
    handleFilterUnitOfMeasurements: setFilterUnitOfMeasurement,
  });

  const isLoading = isFetchingUnitOfMeasurements;

  const isEmptyList = Boolean(unitOfMeasurements?.unitsMeasurements?.length);

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

  function handleAddUnitOfMeasurement(
    unitOfMeasurement: FormUnitOfMeasurement,
  ) {
    return mutateAddUnitOfMeasurement(unitOfMeasurement);
  }

  function handleUpdateUnitOfMeasurementt(
    unitOfMeasurement: FormUnitOfMeasurement & { id: string },
  ) {
    return mutateUpdateUnitOfMeasurement(unitOfMeasurement);
  }

  function handleOrderedList(orderType: 'name' | 'createdAt') {
    return setFilterUnitOfMeasurement((prevState) => ({
      ...prevState,
      ordered: orderType,
    }));
  }

  function handleClearFilters() {
    return setFilterUnitOfMeasurement({
      name: '',
      status: '',
      ordered: '',
    });
  }

  function handleFilterApply() {
    return Boolean(filterUnitOfMeasurement.status);
  }

  function handleOrderApply() {
    return (
      Boolean(filterUnitOfMeasurement.ordered) ||
      Boolean(filterUnitOfMeasurement.name)
    );
  }

  return (
    <Flex className="h-full" justify="center" vertical>
      <Flex gap={12}>
        <Input
          placeholder="Pesquise por nome"
          onChange={({ target }) => {
            setFilterUnitOfMeasurement({
              ...filterUnitOfMeasurement,
              name: target.value,
            });
          }}
          value={filterUnitOfMeasurement.name}
          allowClear
        />

        {handleFilterApply() || handleOrderApply() ? (
          <Button onClick={handleClearFilters} type="dashed">
            <Icon component="ClearOutlined" />
            {handleOrderApply() ? 'Limpar' : 'Limpar filtros'}
          </Button>
        ) : null}

        <Button
          onClick={() => {
            setStateUnitOfMeasurement({
              form: initialValues,
              type: RequestVerbEnum.POST,
            });
            setIsVisibleModalAddUnitOfMeasurement(true);
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
          dataSource={data}
          loading={isLoading}
          size="small"
          pagination={{
            ...tableParams.pagination,
            total: unitOfMeasurements?.totalCount,
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

      <ModalAddUnitOfMeasurement
        form={stateUnitOfMeasurement.form}
        handleAddUnitOfMeasurement={handleAddUnitOfMeasurement}
        handleUpdateUnitOfMeasurement={handleUpdateUnitOfMeasurementt}
        isFetchingAddUnitOfMeasurement={isFetchingAddUnitOfMeasurements}
        isFetchingUpdateUnitOfMeasurement={isFetchingUpdateUnitOfMeasurement}
        isVisibleModalAddUnitOfMeasurement={isVisibleModalAddUnitOfMeasurement}
        onClose={() => setIsVisibleModalAddUnitOfMeasurement(false)}
        type={stateUnitOfMeasurement.type}
      />
    </Flex>
  );
}
