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

  const isEmptyList = Boolean(salesMade?.sales?.length);

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
