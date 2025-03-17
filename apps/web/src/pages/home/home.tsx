import { Flex, Grid } from '@ant-ui/react';

import clsx from 'clsx';
import { WrapperLoading } from '../../components';
import {
  BarChart,
  BarChartHorizontal,
  LineChart,
  mountDataBarChartSalesPerMonth,
  mountDataBarHorizontalChartTopClients,
  mountDataBarHorizontalChartTopProductsSelling,
  mountDataLineChartSalesLastSevenDays,
  mountDataPieChartPaymentMethodPercentage,
  mountDataPierChartTopSellingCategories,
  PieChart,
} from './components';
import { useGetChartsDashboard, useGetNotificationsDashboard } from './hooks';

export default function Home() {
  const { useBreakpoint } = Grid.Root;

  const screens = useBreakpoint();

  const { chartsDashboard, isFetchingChartsDashboard } =
    useGetChartsDashboard();

  const { isFetchingNotificationsDashboard } = useGetNotificationsDashboard();

  const isEmptyCharts =
    Boolean(chartsDashboard?.paymentMethodPercentage) &&
    Boolean(chartsDashboard?.salesLastSevenDays) &&
    Boolean(chartsDashboard?.salesPerMonth) &&
    Boolean(chartsDashboard?.topClients) &&
    Boolean(chartsDashboard?.topProductsSelling) &&
    Boolean(chartsDashboard?.topSellingCategories);

  const isLoading =
    isFetchingChartsDashboard || isFetchingNotificationsDashboard;

  return (
    <Flex vertical align="center" justify="center" className="px-4 py-4 h-full">
      {isLoading ? (
        <WrapperLoading />
      ) : (
        <Grid.Row
          gutter={[12, 12]}
          className={clsx('w-full h-full justify-between', {
            'justify-center': !screens.sm,
          })}
        >
          <Grid.Col span={24}>
            <BarChart
              titleChart="Vendas Realizadas (Por mês)"
              data={
                mountDataBarChartSalesPerMonth(
                  chartsDashboard?.salesPerMonth,
                ) as any
              }
            />
          </Grid.Col>

          <Grid.Col span={16}>
            <LineChart
              titleChart="Vendas Realizadas (Últimos 7 dias)"
              data={
                mountDataLineChartSalesLastSevenDays(
                  chartsDashboard?.salesLastSevenDays,
                ) as any
              }
            />
          </Grid.Col>

          <Grid.Col span={8}>
            <PieChart
              titleChart="Distribuição por tipo de pagamento"
              data={
                mountDataPieChartPaymentMethodPercentage(
                  chartsDashboard?.paymentMethodPercentage,
                ) as any
              }
            />
          </Grid.Col>

          <Grid.Col span={24}>
            <BarChartHorizontal
              titleChart="Top 5 clientes"
              data={
                mountDataBarHorizontalChartTopClients(
                  chartsDashboard?.topClients,
                ) as any
              }
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <PieChart
              titleChart="Top 5 categorias"
              data={
                mountDataPierChartTopSellingCategories(
                  chartsDashboard?.topSellingCategories,
                ) as any
              }
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <BarChartHorizontal
              titleChart="Top 5 produtos"
              data={
                mountDataBarHorizontalChartTopProductsSelling(
                  chartsDashboard?.topProductsSelling,
                ) as any
              }
            />
          </Grid.Col>
        </Grid.Row>
      )}
    </Flex>
  );
}
