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
import { ModalPaymentMethod } from './components/modal-payment-method';
import {
  FormPaymentMethod,
  StateType,
} from './components/modal-payment-method/types';
import useDataTable from './hooks/useDataTable';
import usePaymentMethodsMutation from './hooks/usePaymentMethodsMutations';
import { initialValues } from './services';
import { FilterPaymentMethods, PaymentMethod } from './types';

export default function PaymentMethods() {
  const [tableParams, setTableParams] = useState<TableParams<any>>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  const [statePaymentMethods, setStatePaymentMethods] = useState<StateType>({
    type: RequestVerbEnum.POST,
    form: initialValues,
  });

  const [isVisibleModalAddPaymentMethods, setIsVisibleModalAddPaymentMethods] =
    useState(false);

  const [filterPaymentMethods, setFilterPaymentMethods] =
    useState<FilterPaymentMethods>({
      name: '',
      status: '',
      ordered: '',
    });

  const debounceSearchTerm = useDebounce(filterPaymentMethods.name);

  const {
    paymentMethods,
    mutateAddPaymentMethod,
    isLoadingPaymentMethods,
    mutateUpdatePaymentMethod,
  } = usePaymentMethodsMutation({
    debounceSearchTerm,
    filterPaymentMethods,
    selectedPage: tableParams?.pagination?.current as number,
    setIsVisibleModalAddPaymentMethods,
  });

  function updateProductCategoryAction(
    productCategory: PaymentMethod & { id: string },
  ) {
    setStatePaymentMethods({
      type: RequestVerbEnum.PUT,
      form: {
        name: productCategory.name,
        observation: productCategory.observation,
        active: productCategory?.active,
        id: productCategory?.id,
        tax: productCategory.tax,
      },
    });

    setIsVisibleModalAddPaymentMethods(true);
  }

  const { columns, data } = useDataTable({
    paymentMethods: paymentMethods?.paymentMethods,
    handleUpdatePaymentMethods: updateProductCategoryAction,
    handleFilterPaymentMethods: setFilterPaymentMethods,
  });

  const isLoading = isLoadingPaymentMethods;

  const isEmptyList = Boolean(paymentMethods?.paymentMethods?.length);

  function handleAddClient(productCategory: FormPaymentMethod) {
    mutateAddPaymentMethod(productCategory);
  }

  function handleOrderedList(orderType: 'name' | 'createdAt') {
    setFilterPaymentMethods((prevState) => ({
      ...prevState,
      ordered: orderType,
    }));
  }

  function handleClearFilters() {
    setFilterPaymentMethods({
      name: '',
      status: '',
      ordered: '',
    });
  }

  function handleUpdateClient(
    productCategory: FormPaymentMethod & { id: string },
  ) {
    mutateUpdatePaymentMethod(productCategory);
  }

  function handleFilterApply() {
    return Boolean(filterPaymentMethods.status);
  }

  function handleOrderApply() {
    return (
      Boolean(filterPaymentMethods.ordered) ||
      Boolean(filterPaymentMethods.name)
    );
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

  return (
    <Flex className="h-full" justify="center" vertical>
      <Flex gap={12}>
        <Input
          placeholder="Pesquise por nome"
          onChange={({ target }) => {
            setFilterPaymentMethods((prevState) => ({
              ...prevState,
              name: target.value,
            }));
          }}
          value={filterPaymentMethods.name}
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
            setStatePaymentMethods({
              form: initialValues,
              type: RequestVerbEnum.POST,
            });
            setIsVisibleModalAddPaymentMethods(true);
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
            total: paymentMethods?.totalCount,
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

      <ModalPaymentMethod
        form={statePaymentMethods.form}
        type={statePaymentMethods.type}
        isLoading={isLoadingPaymentMethods}
        handleAddPaymentMethod={handleAddClient}
        handleUpdatePaymentMethod={handleUpdateClient}
        onClose={() => setIsVisibleModalAddPaymentMethods(false)}
        isVisibleModalAddPaymentMethod={isVisibleModalAddPaymentMethods}
      />
    </Flex>
  );
}
