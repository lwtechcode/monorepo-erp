import { Button, Flex, Icon } from '@ant-ui/react';
import { TableColumnsType } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { formatDate, formatMoney } from '../../../utils/formatters';
import { renderStatus } from '../../../utils/functions/renderStatus';
import { BillToPay, FilterBillToPay } from '../types';

type DataTableBillToPayTypes = {
  billToPays?: Array<BillToPay>;
  handleRemoveBillToPay?: () => void;
  handleUpdateBillToPay?: (BillToPayData: BillToPay) => void;
  handleFilterBillToPays?: Dispatch<SetStateAction<FilterBillToPay>>;
};

export function useDataTable({
  billToPays,
  handleUpdateBillToPay,
}: DataTableBillToPayTypes) {
  const columns: TableColumnsType<BillToPay> = [
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
      key: 'pay_date',
      title: 'Data pagamento',
      dataIndex: 'pay_date',
      width: '10%',
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
      key: 'creditor',
      title: 'Credor',
      dataIndex: 'creditor',
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
              const BillToPaySelected = billToPays?.find(({ id }) => {
                return record.id === id;
              });

              return handleUpdateBillToPay && BillToPaySelected
                ? handleUpdateBillToPay({ ...BillToPaySelected })
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

  const data = billToPays?.map((billToPay) => ({
    key: billToPay.id,
    id: billToPay.id,
    description: billToPay.description || '-',
    due_date: formatDate(billToPay.due_date) || '-',
    value: formatMoney(billToPay.value as number) || '-',
    pay_date: formatDate(billToPay.pay_date as string) || '-',
    creditor: billToPay.creditor || '-',
    status: renderStatus(billToPay.status),
  }));

  return { columns, data };
}
