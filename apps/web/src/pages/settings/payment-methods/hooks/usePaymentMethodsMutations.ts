import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addPaymentMethod,
  getAllPaymentMethods,
  updatePaymentMethod,
} from '../services';
import { FilterPaymentMethods } from '../types';

type PaymentMethodsMutationProps = {
  filterPaymentMethods: FilterPaymentMethods;
  debounceSearchTerm: string;
  selectedPage: number;
  setIsVisibleModalAddPaymentMethods: (isVisible: boolean) => void;
};

export default function usePaymentMethodsMutation({
  selectedPage,
  filterPaymentMethods,
  debounceSearchTerm,
  setIsVisibleModalAddPaymentMethods,
}: PaymentMethodsMutationProps) {
  const {
    data: paymentMethods,
    isPending: isFetchingPaymentMethods,
    refetch: refetchPaymentMethods,
  } = useQuery({
    queryKey: [
      selectedPage,
      debounceSearchTerm,
      filterPaymentMethods.name,
      filterPaymentMethods.ordered,
      filterPaymentMethods.status,
    ],
    queryFn: () => {
      return getAllPaymentMethods({
        status: filterPaymentMethods.status,
        orderBy: filterPaymentMethods.ordered,
        name: debounceSearchTerm,
        page: selectedPage,
        pageSize: 20,
      });
    },
  });

  const {
    mutate: mutateAddPaymentMethod,
    isPending: isFetchingAddPaymentMethods,
  } = useMutation({
    mutationFn: addPaymentMethod,

    onSuccess: () => {
      refetchPaymentMethods();
      setIsVisibleModalAddPaymentMethods(false);
    },
  });

  const {
    mutate: mutateUpdatePaymentMethod,
    isPending: isFetchingUpdatePaymentMethods,
  } = useMutation({
    mutationFn: updatePaymentMethod,
    onSuccess: () => {
      refetchPaymentMethods();
      setIsVisibleModalAddPaymentMethods(false);
    },
  });

  const isLoadingPaymentMethods =
    isFetchingPaymentMethods ||
    isFetchingAddPaymentMethods ||
    isFetchingUpdatePaymentMethods;

  return {
    paymentMethods,
    mutateAddPaymentMethod,
    isLoadingPaymentMethods,
    mutateUpdatePaymentMethod,
  };
}
