import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addSupplier,
  generateSuppliersReports,
  getAllSuppliers,
  updateSupplier,
} from '../services';
import { FilterSuppliers } from '../types';

type SupplierMutationProps = {
  filterSuppliers: FilterSuppliers;
  debounceSearchTerm: string;
  selectedPage: number;
  setIsVisibleModalAddSupplier: (isVisible: boolean) => void;
};

export const QUERY_KEY_SUPPLIERS = 'fornecedores';

export default function useSuppliersMutation({
  filterSuppliers,
  debounceSearchTerm,
  selectedPage,
  setIsVisibleModalAddSupplier,
}: SupplierMutationProps) {
  const {
    data: suppliers,
    refetch: refetchSuppliers,
    isPending: isFetchingSuppliers,
  } = useQuery({
    queryKey: [
      QUERY_KEY_SUPPLIERS,
      selectedPage,
      debounceSearchTerm,
      filterSuppliers.ordered,
      filterSuppliers.status,
      filterSuppliers.textFilterByNameAndCnpj,
    ],
    queryFn: () => {
      return getAllSuppliers({
        status: filterSuppliers.status,
        orderBy: filterSuppliers.ordered,
        nameOrCNPJ: debounceSearchTerm,
        page: selectedPage,
        pageSize: 20,
      });
    },
  });

  const { mutate: mutateAddSupplier, isPending: isFetchingAddSuppliers } =
    useMutation({
      mutationFn: addSupplier,
      onSuccess: () => {
        refetchSuppliers();
        setIsVisibleModalAddSupplier(false);
      },
    });

  const { mutate: mutateUpdateSupplier, isPending: isFetchingUpdateSupplier } =
    useMutation({
      mutationFn: updateSupplier,
      onSuccess: () => {
        refetchSuppliers();
        setIsVisibleModalAddSupplier(false);
      },
    });

  const { mutate: mutateReport, isPending: isFetchingReport } = useMutation({
    mutationFn: () => {
      return generateSuppliersReports({
        textFilterByNameAndCnpj: filterSuppliers.textFilterByNameAndCnpj,
        ordered: filterSuppliers.ordered,
        status: filterSuppliers.status,
      });
    },
  });

  const isLoadingSuppliers =
    isFetchingAddSuppliers ||
    isFetchingSuppliers ||
    isFetchingReport ||
    isFetchingUpdateSupplier;

  return {
    suppliers,
    mutateReport,
    mutateAddSupplier,
    isLoadingSuppliers,
    mutateUpdateSupplier,
  };
}
