import { useQuery } from '@tanstack/react-query';
import { getSaleIdBudgetMade } from '../services';

const QUERY_KEY_BUDGET_MADE = 'orcamento-id';

type BudgetIdMadeTypes = {
  idBudgetMade?: string;
  enabled?: boolean;
};

export function useGetByIdBudgetMade({
  idBudgetMade,
  enabled,
}: BudgetIdMadeTypes) {
  const {
    isLoading,
    isFetching,
    isRefetching,
    data: budgetIdMade,
    refetch: refetchBudgetIdMade,
  } = useQuery({
    queryKey: [QUERY_KEY_BUDGET_MADE],
    queryFn: () => {
      return getSaleIdBudgetMade({ id: idBudgetMade });
    },
    enabled: enabled,
  });

  return {
    budgetIdMade,
    isFetchingBudgetIdMade: isRefetching || isFetching || isLoading,
    refetchBudgetIdMade,
  };
}
