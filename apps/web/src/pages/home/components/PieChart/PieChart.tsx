import { Card, EmptyData, Flex, Typography } from '@ant-ui/react';
import { PieChartProps } from '@mui/x-charts';
import { PieChart as PieChartComponent } from '@mui/x-charts/PieChart';
import { COLORS_CHARTS } from '../../../../utils/constants';
import {
  PaymentMethodPercentageTypes,
  TopSellingCategoryTypes,
} from '../../types';
import { PieChartTypes } from './types';

export function mountDataPieChartPaymentMethodPercentage(
  data?: Array<PaymentMethodPercentageTypes>,
): PieChartProps {
  if (!data || data.length === 0) {
    return {
      series: [],
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

export function mountDataPierChartTopSellingCategories(
  data?: Array<TopSellingCategoryTypes>,
): PieChartProps {
  if (!data || data.length === 0) {
    return {
      series: [],
    };
  }

  return {
    xAxis: [
      {
        scaleType: 'band',
        data: data.map(({ category_name }) => category_name),
      },
    ],
    series: [
      {
        data: data?.map(({ category_name, sales_percentage }) => ({
          value: Number(sales_percentage.toFixed(2)),
          label: category_name,
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

        {Boolean(data?.series?.length) ? (
          <PieChartComponent
            series={data.series}
            colors={COLORS_CHARTS}
            height={240}
            loading={loading}
            sx={{
              '& .MuiPieArcLabel-root': {
                fill: '#ffffff',
                fontSize: 14,
                fontWeight: 'bold',
              },
            }}
          />
        ) : (
          <Flex vertical align="center" justify="center">
            <EmptyData />
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
