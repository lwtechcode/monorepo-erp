import { Card, Flex, Typography } from '@ant-ui/react';
import {
  LineChart as LineChartComponent,
  LineChartProps,
} from '@mui/x-charts/LineChart';
import { COLORS_CHARTS } from '../../../../utils/constants';
import { formatMoney } from '../../../../utils/formatters';
import { SalesLastSevenDayTypes } from '../../types';
import { LineChartTypes } from './types';

export function mountDataLineChartSalesLastSevenDays(
  data?: Array<SalesLastSevenDayTypes>,
): LineChartProps {
  if (!data || data.length === 0) {
    return {
      xAxis: [{ data: [] }],
      series: [{ data: [] }],
    };
  }

  return {
    xAxis: [
      {
        id: 'dias',
        scaleType: 'band',
        data: data.map(({ date_day }) => date_day),
      },
    ],
    yAxis: [
      {
        valueFormatter: (value) =>
          parseInt(value).toString().concat('K') || '0,00',
      },
    ],
    series: [
      {
        data: data.map(({ value_sale }) => value_sale),
        valueFormatter: (value) => formatMoney(value as number) || 'R$ 0,00',
      },
    ],
  };
}

export function LineChart({ data, titleChart, loading }: LineChartTypes) {
  return (
    <Card>
      <Flex vertical>
        <Typography.Text strong className="text-lg">
          {titleChart}
        </Typography.Text>

        <LineChartComponent
          xAxis={data?.xAxis}
          yAxis={data?.yAxis}
          series={data?.series}
          colors={COLORS_CHARTS}
          loading={loading}
          height={240}
        />
      </Flex>
    </Card>
  );
}
