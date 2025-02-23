import { useQuery } from '@tanstack/react-query';
import { getSaleBudgetsMade } from '../services';
import { FilterSaleBudgetsType } from '../types';

const QUERY_KEY_SALES_MADE = 'vendas-realizadas';

type SalesMadeProps = {
  filterSales: FilterSaleBudgetsType;
  debounceSearchTerm: string;
  selectedPage: number;
};

export function useGetAllSalesMade({
  debounceSearchTerm,
  filterSales,
  selectedPage,
}: SalesMadeProps) {
  const {
    data: salesMade,
    isPending: isFetchingSalesMade,
    refetch: refetchSalesMade,
  } = useQuery({
    queryKey: [
      QUERY_KEY_SALES_MADE,
      filterSales.status,
      filterSales.ordered,
      debounceSearchTerm,
      selectedPage,
    ],
    queryFn: () => {
      return getSaleBudgetsMade({
        status: filterSales.status,
        orderBy: filterSales.ordered as string,
        nameOrCPF: debounceSearchTerm,
        page: selectedPage,
        pageSize: 20,
      });
    },
  });

  return {
    salesMade,
    isFetchingSalesMade,
    refetchSalesMade,
  };
}
