import { Card, Flex, Typography } from '@ant-ui/react';
import {
  BarChart as BarChartComponent,
  BarChartProps,
} from '@mui/x-charts/BarChart';
import { formatMoney } from '../../../../utils/formatters';
import {
  SalesPerMonthTypes,
  TopClientTypes,
  TopProductsSellingTypes,
  TopSellingCategoryTypes,
} from '../../types';

import { COLORS_CHARTS } from '../../../../utils/constants';
import { BarChartHorizontalTypes, BarChartTypes } from './types';

export function mountDataBarChartSalesPerMonth(
  data?: Array<SalesPerMonthTypes>,
): BarChartProps {
  if (!data || data.length === 0) {
    return {
      xAxis: [{ data: [] }],
      series: [{ data: [] }],
    };
  }

  return {
    xAxis: [
      {
        scaleType: 'band',
        data: data.map(({ month }) => month),
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
        dataKey: 'revenue',
        valueFormatter: (value) => formatMoney(value as number) || 'R$ 0,00',
      },
    ],
    dataset: data?.map(({ month, revenue }, index) => ({
      month,
      revenue,
    })),
  };
}

export function mountDataBarHorizontalChartTopClients(
  data?: Array<TopClientTypes>,
): BarChartProps {
  if (!data || data.length === 0) {
    return {
      yAxis: [
        {
          dataKey: 'cliente',
          scaleType: 'band', // Mantém o tipo de escala mesmo sem dados
          data: [],
        },
      ],

      series: [
        {
          dataKey: 'valor',
          valueFormatter: (value) => formatMoney(value as number) || 'R$ 0,00',
        },
      ],
      dataset: [],
    };
  }

  return {
    yAxis: [
      {
        scaleType: 'band',
        dataKey: 'cliente',
        data: data.map(({ client_name }) => client_name),
      },
    ],
    xAxis: [
      {
        valueFormatter: (value) => formatMoney(value as number) || 'R$ 0,00',
      },
    ],
    series: [
      {
        dataKey: 'valor',
        valueFormatter: (value) => formatMoney(value as number) || 'R$ 0,00',
      },
    ],
    dataset: data.map(({ client_name, total_value }) => ({
      cliente: client_name,
      valor: Number(total_value),
    })),
  };
}

export function mountDataBarHorizontalChartTopProductsSelling(
  data?: Array<TopProductsSellingTypes>,
): BarChartProps {
  if (!data || data.length === 0) {
    return {
      yAxis: [
        {
          dataKey: 'product',
          scaleType: 'band',
          data: [],
        },
      ],
      series: [
        {
          dataKey: 'qty',
          valueFormatter: (value) => String(value).concat('un'),
        },
      ],
      dataset: [],
    };
  }

  return {
    yAxis: [
      {
        scaleType: 'band',
        dataKey: 'product',
        data: data.map(({ name }) => name),
      },
    ],
    xAxis: [
      {
        scaleType: 'linear',
        min: 0,
        tickMinStep: 1, // Garante apenas valores inteiros
        valueFormatter: (value) => `${value} un`,
      },
    ],
    series: [
      {
        dataKey: 'qty',
        valueFormatter: (value) => String(value).concat('un'),
      },
    ],
    dataset: data.map(({ name, total_sold }) => ({
      product: name,
      qty: Number(total_sold),
    })),
  };
}

export function mountDataBarHorizontalChartTopSellingCategories(
  data?: Array<TopSellingCategoryTypes>,
): BarChartProps {
  if (!data || data.length === 0) {
    return {
      yAxis: [
        {
          dataKey: 'category_name',
          scaleType: 'band',
          data: [],
        },
      ],
      series: [
        {
          dataKey: 'sales_percentage',
          valueFormatter: (value) => String(value).concat('%'),
        },
      ],
      dataset: [],
    };
  }

  return {
    yAxis: [
      {
        scaleType: 'band',
        dataKey: 'category_name',
        data: data.map(({ category_name }) => category_name),
      },
    ],
    xAxis: [
      {
        scaleType: 'linear',
        min: 0,
        tickMinStep: 1, // Garante apenas valores inteiros
        valueFormatter: (value) => `${value} %`,
      },
    ],
    series: [
      {
        dataKey: 'sales_percentage',
        valueFormatter: (value) => String(value).concat('%'),
      },
    ],
    dataset: data.map(({ category_name, sales_percentage }) => ({
      category_name: category_name,
      sales_percentage: Number(sales_percentage),
    })),
  };
}

export function BarChart({ data, titleChart, loading }: BarChartTypes) {
  return (
    <Card>
      <Flex vertical>
        <Typography.Text strong className="text-lg">
          {titleChart}
        </Typography.Text>

        <BarChartComponent
          dataset={data?.dataset}
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

export default function BarChartHorizotal({
  data,
  titleChart,
  loading,
}: BarChartHorizontalTypes) {
  return (
    <Card>
      <Flex vertical>
        <Typography.Text strong className="text-lg">
          {titleChart}
        </Typography.Text>

        <BarChartComponent
          dataset={data?.dataset}
          yAxis={data?.yAxis}
          xAxis={data?.xAxis}
          series={data?.series}
          layout="horizontal"
          colors={COLORS_CHARTS}
          height={240}
          margin={{ left: 200, right: 50 }}
          loading={loading}
          slotProps={{
            noDataOverlay: {
              children: 'Nenhum dado disponível para exibição',
            },
          }}
        />
      </Flex>
    </Card>
  );
}
