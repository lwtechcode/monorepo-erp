import { Card, Flex, Typography } from '@ant-ui/react';
import { PieChartProps } from '@mui/x-charts';
import { PieChart as PieChartComponent } from '@mui/x-charts/PieChart';
import { COLORS_CHARTS } from '../../../../utils/constants';
import { PaymentMethodPercentageTypes } from '../../types';
import { PieChartTypes } from './types';

export function mountDataPieChartPaymentMethodPercentage(
  data?: Array<PaymentMethodPercentageTypes>,
): PieChartProps {
  if (!data || data.length === 0) {
    return {
      xAxis: [{ data: [] }],
      series: [{ data: [] }],
    };
  }

  return {
    xAxis: [
      {
        id: 'metódo-de-pagamento',
        scaleType: 'band',
        data: data.map(({ payment_method }) => payment_method),
      },
    ],
    series: [
      {
        data: data?.map(({ percentage, payment_method }) => ({
          value: Number(percentage.toFixed(2)),
          label: payment_method,
        })),
        innerRadius: 60,
        arcLabel: (item) => `${item.value}%`,
        valueFormatter: ({ value }) => value.toFixed(2).concat('%') || '0.0%',
      },
    ],
  };
}

export function PieChart({ data, titleChart, loading }: PieChartTypes) {
  return (
    <Card>
      <Flex vertical>
        <Typography.Text strong className="text-lg">
          {titleChart}
        </Typography.Text>

        <PieChartComponent
          series={data?.series}
          colors={COLORS_CHARTS}
          height={240}
          loading={loading}
          sx={{
            '& .MuiPieArcLabel-root': {
              fill: '#ffffff', // Define a cor branca no label dentro do arco
              fontSize: 14, // Ajusta o tamanho do texto (opcional)
              fontWeight: 'bold', // Adiciona negrito (opcional)
            },
          }}
        />
      </Flex>
    </Card>
  );
}
