import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addBillToReceive,
  generateBillsToReceiveReports,
  getAllBillsToReceive,
  getAllClientsOptions,
  updateBillToReceive,
} from '../services';
import { FilterBillToReceive } from '../types';

type BillsToReceiveMutationProps = {
  filterBillToReceive: FilterBillToReceive;
  debounceSearchTerm: string;
  selectedPage: number;
  setIsVisibleModalAddBillToReceive: (isVisible: boolean) => void;
};

export const QUERY_KEY_CLIENTS_OPTIONS = 'clients_options';
export const QUERY_KEY_PAYMENT_METHODS_OPTIONS = 'payment_methods_options';

export const QUERY_KEY_BILL_TO_RECEIVE = 'contas-a-receber';

export default function useBillToReceiveMutation({
  filterBillToReceive,
  debounceSearchTerm,
  selectedPage,
  setIsVisibleModalAddBillToReceive,
}: BillsToReceiveMutationProps) {
  const {
    data: billsToReceive,
    isPending: isFetchingBillsToReceive,
    refetch: refetchBillsToReceive,
  } = useQuery({
    queryKey: [
      QUERY_KEY_BILL_TO_RECEIVE,
      selectedPage,
      debounceSearchTerm,
      filterBillToReceive.description,
      filterBillToReceive.status,
      filterBillToReceive.startDate,
      filterBillToReceive.endDate,
    ],
    queryFn: () => {
      return getAllBillsToReceive({
        description: filterBillToReceive.description,
        endDate: filterBillToReceive.endDate,
        startDate: filterBillToReceive.startDate,
        status: filterBillToReceive.status,
        page: selectedPage,
        pageSize: 20,
      });
    },
  });

  const {
    mutate: mutateAddBillToReceive,
    isPending: isFetchingAddBillToReceive,
  } = useMutation({
    mutationFn: addBillToReceive,

    onSuccess: () => {
      refetchBillsToReceive();
      setIsVisibleModalAddBillToReceive(false);
    },
  });

  const {
    mutate: mutateUpdateBillToReceive,
    isPending: isFetchingUpdateBillToReceive,
  } = useMutation({
    mutationFn: updateBillToReceive,

    onSuccess: () => {
      refetchBillsToReceive();
      setIsVisibleModalAddBillToReceive(false);
    },
  });

  const { data: clientsOptions, isPending: isFetchingClientsOptions } =
    useQuery({
      queryKey: [QUERY_KEY_CLIENTS_OPTIONS],
      queryFn: () => {
        return getAllClientsOptions();
      },
    });

  // const {
  //   data: paymentMethodsOptions,
  //   isPending: isFetchingPaymentMethodsOptions,
  // } = useQuery({
  //   queryKey: [QUERY_KEY_PAYMENT_METHODS_OPTIONS],
  //   queryFn: () => {
  //     return getAllPaymentMethodsOptions();
  //   },
  // });

  const { mutate: mutateReport, isPending: isFetchingReport } = useMutation({
    mutationFn: generateBillsToReceiveReports,
  });

  const isLoadingBillsToPay =
    isFetchingReport ||
    isFetchingAddBillToReceive ||
    isFetchingUpdateBillToReceive ||
    isFetchingBillsToReceive ||
    isFetchingClientsOptions;

  return {
    mutateReport,
    billsToReceive,
    clientsOptions,
    isLoadingBillsToPay,
    mutateAddBillToReceive,
    mutateUpdateBillToReceive,
  };
}
