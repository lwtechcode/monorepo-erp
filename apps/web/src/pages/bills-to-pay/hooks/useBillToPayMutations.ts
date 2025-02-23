import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addBillToPay,
  generateBillsToPayReports,
  getAllBillsToPay,
  updateBillToPay,
} from '../services';
import { FilterBillToPay } from '../types';

type BillsToPayMutationProps = {
  filterBillToPay: FilterBillToPay;
  debounceSearchTerm: string;
  selectedPage: number;
  setIsVisibleModalAddBillToPay: (isVisible: boolean) => void;
};

export const QUERY_KEY_BILL_TO_PAY = 'contas-a-pagar';

export default function useBillToPayMutation({
  filterBillToPay,
  debounceSearchTerm,
  selectedPage,
  setIsVisibleModalAddBillToPay,
}: BillsToPayMutationProps) {
  const {
    data: billsToPay,
    isPending: isFetchingBillsToPay,
    refetch: refetchBillsToPay,
  } = useQuery({
    queryKey: [
      QUERY_KEY_BILL_TO_PAY,
      selectedPage,
      debounceSearchTerm,
      filterBillToPay.description,
      filterBillToPay.status,
      filterBillToPay.startDate,
      filterBillToPay.endDate,
    ],
    queryFn: () => {
      return getAllBillsToPay({
        description: filterBillToPay?.description,
        endDate: filterBillToPay?.endDate,
        startDate: filterBillToPay?.startDate,
        status: filterBillToPay?.status,
        page: selectedPage,
        pageSize: 20,
      });
    },
  });

  const { mutate: mutateAddBillToPay, isPending: isFetchingAddBillToPay } =
    useMutation({
      mutationFn: addBillToPay,

      onSuccess: () => {
        refetchBillsToPay();
        setIsVisibleModalAddBillToPay(false);
      },
    });

  const {
    mutate: mutateUpdateBillToPay,
    isPending: isFetchingUpdateBillToPay,
  } = useMutation({
    mutationFn: updateBillToPay,

    onSuccess: () => {
      refetchBillsToPay();
      setIsVisibleModalAddBillToPay(false);
    },
  });

  const { mutate: mutateReport, isPending: isFetchingReport } = useMutation({
    mutationFn: generateBillsToPayReports,
  });

  const isLoadingBillsToPay =
    isFetchingAddBillToPay ||
    isFetchingUpdateBillToPay ||
    isFetchingBillsToPay ||
    isFetchingReport;

  return {
    billsToPay,
    mutateReport,
    mutateAddBillToPay,
    isLoadingBillsToPay,
    mutateUpdateBillToPay,
  };
}
