import { useState } from 'react';

import {
  Button,
  Flex,
  Icon,
  Input,
  Table,
  TableParams,
  Typography,
} from '@ant-ui/react';
import useDebounce from '../../hooks/useDebounce';
import { SortOrderType } from '../../utils/types';
import { useDataTable, useGetAllSalesMade } from './hooks';
import { FilterSalesType } from './types';

export default function SalesMadePage() {
  const [tableParams, setTableParams] = useState<TableParams<any>>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  const [filterSales, setFilterSales] = useState<FilterSalesType>({
    textFilterByNameAndCpf: '',
    status: '',
    ordered: '',
  });

  const debounceSearchTerm = useDebounce(
    filterSales.textFilterByNameAndCpf as string,
  );

  const { salesMade, isFetchingSalesMade } = useGetAllSalesMade({
    debounceSearchTerm,
    filterSales,
    selectedPage: tableParams?.pagination?.current as number,
  });

  const isLoading = isFetchingSalesMade;

  function handleFilterApply() {
    return Boolean(filterSales.status);
  }

  function handleOrderApply() {
    return (
      Boolean(filterSales.ordered) ||
      Boolean(filterSales.textFilterByNameAndCpf)
    );
  }

  function handleOrderedList(orderType: 'name' | 'createdAt') {
    setFilterSales((prevState) => ({ ...prevState, ordered: orderType }));
  }

  function handleClearFilters() {
    setFilterSales({ textFilterByNameAndCpf: '', status: '', ordered: '' });
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

  const { columns, data } = useDataTable({ sales: salesMade?.sales });

  return (
    <Flex className="h-full" justify="center" vertical>
      <Typography.Title level={4}>Vendas</Typography.Title>

      <Flex gap={12}>
        <Input
          placeholder="Pesquise por nome ou CPF"
          onChange={({ target }) => {
            setFilterSales((prevState) => ({
              ...prevState,
              textFilterByNameAndCpf: target.value,
            }));
          }}
          value={filterSales.textFilterByNameAndCpf}
          allowClear
        />

        {handleFilterApply() || handleOrderApply() ? (
          <Button onClick={handleClearFilters} type="dashed">
            <Icon component="ClearOutlined" />
            {handleOrderApply() ? 'Limpar' : 'Limpar filtros'}
          </Button>
        ) : null}
      </Flex>

      <Flex className="h-full" justify="start" vertical rootClassName="mt-4">
        <Table
          size="small"
          columns={columns as any}
          dataSource={data}
          loading={isLoading}
          onChange={handleTableChange}
          pagination={{
            ...tableParams.pagination,
            total: salesMade?.totalCount,
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
      </Flex>
    </Flex>
  );
}
