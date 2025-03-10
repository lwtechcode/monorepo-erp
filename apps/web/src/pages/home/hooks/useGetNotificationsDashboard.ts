import { useQuery } from '@tanstack/react-query';
import { getNotificationsDashboard } from '../services';

const QUERY_KEY_NOTIFICATINOS_DASHBOARD = 'notificacoes-home';

export function useGetNotificationsDashboard() {
  const {
    data: notificationsDashboard,
    isFetching,
    isRefetching,
    refetch: refetchNotificationsDashboard,
  } = useQuery({
    queryKey: [QUERY_KEY_NOTIFICATINOS_DASHBOARD],
    queryFn: () => {
      return getNotificationsDashboard();
    },
    staleTime: Infinity,
  });

  return {
    notificationsDashboard,
    isFetchingNotificationsDashboard: isFetching || isRefetching,
    refetchNotificationsDashboard,
  };
}
