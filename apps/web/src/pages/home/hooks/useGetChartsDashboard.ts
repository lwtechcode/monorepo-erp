import { useQuery } from '@tanstack/react-query';
import { getChartsDashboard } from '../services';

const QUERY_KEY_CHARTS_DASHBOARD = 'relatorios-graficos';

export function useGetChartsDashboard() {
  const {
    data: chartsDashboard,
    isPending,
    isRefetching,
    isFetching,
    refetch: refetchChartsDashboard,
  } = useQuery({
    queryKey: [QUERY_KEY_CHARTS_DASHBOARD],
    queryFn: () => {
      return getChartsDashboard();
    },
  });

  return {
    chartsDashboard,
    isFetchingChartsDashboard: isPending || isFetching || isRefetching,
    refetchChartsDashboard,
  };
}
