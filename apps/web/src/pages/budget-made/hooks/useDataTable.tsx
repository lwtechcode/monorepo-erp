import { Button, Flex, Icon, Menu, Space, Typography } from '@ant-ui/react';
import { Radio, TableColumnsType, Tooltip } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../enums';
import {
  formatCPF,
  formatDateWithHours,
  formatMoney,
} from '../../../utils/formatters';
import { FilterSalesType } from '../../sales-made/types';
import {
  FilterSaleBudgetsType,
  SaleBudgetsMadeType,
  SaleBudgetsProductType,
} from '../types';

type RenderFilterStatusProps = {
  handleFilterSalesMade?: Dispatch<SetStateAction<FilterSaleBudgetsType>>;
};

function renderFilterStatus({
  handleFilterSalesMade,
}: RenderFilterStatusProps) {
  const [filterValue, setFilterValue] = useState();

  function handleApplyFilter() {
    handleFilterSalesMade
      ? handleFilterSalesMade((prevState) => ({
          ...prevState,
          status: filterValue,
        }))
      : null;
  }

  function handleClearFilter() {
    handleFilterSalesMade
      ? handleFilterSalesMade((prevState) => ({
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

type DataTableClientTypes = {
  sales?: SaleBudgetsMadeType;
  handleFilterSalesMade?: Dispatch<SetStateAction<FilterSalesType>>;
};

export function useDataTable({
  sales,
  handleFilterSalesMade,
}: DataTableClientTypes) {
  const navigate = useNavigate();

  const columns: TableColumnsType<SaleBudgetsProductType> = [
    {
      key: 'name',
      title: 'Nome',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      showSorterTooltip: { title: 'Ordenar por nome' },
      ellipsis: true,
    },
    {
      key: 'cpf',
      title: 'CPF',
      dataIndex: 'cpf',
      ellipsis: true,
    },

    {
      key: 'created_at',
      title: 'Data da venda',
      dataIndex: 'created_at',
      ellipsis: true,
    },
    {
      key: 'payment_name',
      title: 'Pagamento',
      dataIndex: 'payment_name',
      ellipsis: true,
    },
    {
      key: 'tax_payment_value',
      title: 'Acréscimos',
      dataIndex: 'tax_payment_value',
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
      filterDropdown: renderFilterStatus({ handleFilterSalesMade }),
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
      key: 'discount_value',
      title: 'Desconto',
      dataIndex: 'discount_value',
      ellipsis: true,
    },
    {
      key: 'total_value',
      title: 'Total',
      dataIndex: 'total_value',
      ellipsis: true,
    },
    {
      title: 'Ações',
      dataIndex: '',
      key: 'x',
      align: 'center',
      render: (_, record) => (
        <Flex align="center" justify="center">
          <Tooltip title="Finalizar venda">
            <Button
              type="text"
              onClick={() => {
                navigate(RoutesEnum.Sales);
              }}
            >
              <Icon component="DollarTwoTone" />
            </Button>
          </Tooltip>
        </Flex>
      ),
      width: '20%',
    },
  ];

  const data = sales?.map((sale, index) => ({
    key: sale.id,
    id: sale.id,
    name: sale.client?.name || '-',
    cpf: formatCPF(sale.client?.cpf as string) || '-',
    payment_name: sale.payment.name,
    created_at: formatDateWithHours(sale.created_at),
    tax_payment_value: formatMoney(sale.tax_payment_value),
    total_value: formatMoney(sale.total_value),
    discount_value: formatMoney(sale.discount_value),
    status: sale.active ? (
      <Typography.Text type="success">Ativado</Typography.Text>
    ) : (
      <Typography.Text type="danger">Inativo</Typography.Text>
    ),
  }));

  return { columns, data };
}
