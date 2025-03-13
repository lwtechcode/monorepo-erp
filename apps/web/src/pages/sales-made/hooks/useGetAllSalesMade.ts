import { useQuery } from '@tanstack/react-query';
import { getSalesMade } from '../services';
import { FilterSalesType } from '../types';

const QUERY_KEY_SALES_MADE = 'vendas-realizadas';

type SalesMadeProps = {
  filterSales: FilterSalesType;
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
    isPending,
    isRefetching,
    isFetching,
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
      return getSalesMade({
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
    isFetchingSalesMade: isPending || isFetching || isRefetching,
    refetchSalesMade,
  };
}
