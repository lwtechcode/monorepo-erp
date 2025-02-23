import { Button, Flex, Icon } from '@ant-ui/react';
import { TableColumnsType } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { formatDate, formatMoney } from '../../../utils/formatters';
import { BillToReceive, FilterBillToReceive } from '../types';

import { renderStatus } from '../../../utils/functions/renderStatus';

type DataTableBillToReceiveTypes = {
  billToReceive?: Array<BillToReceive>;
  handleRemoveBillToReceive?: () => void;
  handleUpdateBillToReceive?: (BillToReceiveData: BillToReceive) => void;
  handleFilterBillToReceives?: Dispatch<SetStateAction<FilterBillToReceive>>;
};

export function useDataTable({
  billToReceive,
  handleUpdateBillToReceive,
}: DataTableBillToReceiveTypes) {
  const columns: TableColumnsType<BillToReceive> = [
    {
      key: 'description',
      title: 'Descrição',
      dataIndex: 'description',
      width: '20%',
      ellipsis: true,
    },
    {
      key: 'due_date',
      title: 'Data de vencimento',
      dataIndex: 'due_date',
      width: '20%',
      ellipsis: true,
    },
    {
      key: 'receipt_date',
      title: 'Data recebimento',
      dataIndex: 'receipt_date',
      width: '20%',
      ellipsis: true,
    },
    {
      key: 'value',
      title: 'Valor',
      dataIndex: 'value',
      width: '20%',
      ellipsis: true,
    },
    {
      key: 'client',
      title: 'Cliente',
      dataIndex: 'client',
      width: '20%',
      ellipsis: true,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      ellipsis: true,
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
              const BillToReceiveSelected = billToReceive?.find(({ id }) => {
                return record.id === id;
              });

              return handleUpdateBillToReceive && BillToReceiveSelected
                ? handleUpdateBillToReceive({ ...BillToReceiveSelected })
                : null;
            }}
          >
            <Icon component="EditOutlined" />
          </Button>
        </Flex>
      ),
      width: '10%',
    },
  ];

  const data = billToReceive?.map((billsToReceive) => ({
    key: billsToReceive.id,
    id: billsToReceive.id,
    description: billsToReceive.description || '-',
    due_date: formatDate(billsToReceive.due_date) || '-',
    value: formatMoney(billsToReceive.value as number) || '-',
    receipt_date: formatDate(billsToReceive.receipt_date as string) || '-',
    client: billsToReceive?.client?.name || '-',
    status: renderStatus(billsToReceive.status),
  }));

  return { columns, data };
}
