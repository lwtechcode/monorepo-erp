import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addClient,
  generateClientReports,
  getAllClients,
  updateClient,
} from '../services';
import { FilterClient } from '../types';

type ClientsMutationProps = {
  filterClients: FilterClient;
  debounceSearchTerm: string;
  selectedPage: number;
  setIsVisibleModalAddClient: (isVisible: boolean) => void;
};

export const QUERY_KEY_CLIENTS = 'clients';

export default function useClientsMutation({
  filterClients,
  debounceSearchTerm,
  selectedPage,
  setIsVisibleModalAddClient,
}: ClientsMutationProps) {
  const {
    data: clients,
    isPending: isFetchingClients,
    refetch: refetchClients,
  } = useQuery({
    queryKey: [
      selectedPage,
      QUERY_KEY_CLIENTS,
      debounceSearchTerm,
      filterClients.ordered,
      filterClients.status,
    ],
    queryFn: () => {
      return getAllClients({
        status: filterClients?.status,
        orderBy: filterClients?.ordered,
        nameOrCPF: debounceSearchTerm,
        page: selectedPage,
        pageSize: 20,
      });
    },
  });

  const { mutate: mutateAddClient, isPending: isFetchingAddClients } =
    useMutation({
      mutationFn: addClient,
      onSuccess: () => {
        refetchClients();
        setIsVisibleModalAddClient(false);
      },
    });

  const { mutate: mutateUpdateClient, isPending: isFetchingUpdateClient } =
    useMutation({
      mutationFn: updateClient,
      onSuccess: () => {
        refetchClients();
        setIsVisibleModalAddClient(false);
      },
    });

  const { mutate: mutateReport, isPending: isFetchingReportClients } =
    useMutation({
      mutationFn: () =>
        generateClientReports({
          nameOrCPF: filterClients?.textFilterByNameAndCpf,
          orderBy: filterClients?.ordered,
          status: filterClients?.status,
        }),
    });

  const isLoading =
    isFetchingClients ||
    isFetchingAddClients ||
    isFetchingUpdateClient ||
    isFetchingUpdateClient ||
    isFetchingReportClients;

  return {
    clients,
    mutateAddClient,
    mutateUpdateClient,
    mutateReport,
    isLoading,
  };
}
