import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addProduct,
  generateProductsReports,
  getAllProductCategoriesOptions,
  getAllProducts,
  getAllSuppliersOptions,
  updateProduct,
} from '../services';
import { FilterProduct } from '../types';

type ProductsMutationProps = {
  filterProducts: FilterProduct;
  debounceSearchTerm: string;
  selectedPage: number;
  setIsVisibleModalAddProduct: (isVisible: boolean) => void;
};

export const QUERY_KEY_PRODUCTS = 'produtos';
export const QUERY_KEY_CATEGORIES = 'categories';
export const QUERY_KEY_SUPPLIERS = 'fornecedores';

export default function useProductsMutation({
  filterProducts,
  debounceSearchTerm,
  selectedPage,
  setIsVisibleModalAddProduct,
}: ProductsMutationProps) {
  const {
    data: products,
    isPending: isPendingProducts,
    isFetching: isFetchingProducts,
    isLoading: isLoadingFetchProducts,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: [
      QUERY_KEY_PRODUCTS,
      selectedPage,
      debounceSearchTerm,
      filterProducts.categoryId,
      filterProducts.discount,
      filterProducts.ordered,
      filterProducts.status,
    ],
    queryFn: () => {
      return getAllProducts({
        status: filterProducts.status,
        orderBy: filterProducts.ordered,
        categoryId: filterProducts.categoryId,
        nameOrBarCode: debounceSearchTerm,
        page: selectedPage,
        pageSize: 20,
        discount: filterProducts.discount,
      });
    },
  });

  const {
    data: productCategoriesOptions,
    isPending: isFetchingProductCategoriesOptions,
  } = useQuery({
    queryKey: [QUERY_KEY_CATEGORIES],
    queryFn: () => getAllProductCategoriesOptions(),
  });

  const { data: suppliersOptions, isPending: isFetchingSupplierOptions } =
    useQuery({
      queryKey: [QUERY_KEY_SUPPLIERS],
      queryFn: () => getAllSuppliersOptions(),
    });

  const { mutate: mutateAddProduct, isPending: isFetchingAddProducts } =
    useMutation({
      mutationFn: addProduct,
      onSuccess: () => {
        refetchProducts();
        setIsVisibleModalAddProduct(false);
      },
    });

  const { mutate: mutateUpdateProduct, isPending: isFetchingUpdateProduct } =
    useMutation({
      mutationFn: updateProduct,
      onSuccess: () => {
        refetchProducts();
        setIsVisibleModalAddProduct(false);
      },
    });

  const { mutate: mutateReport, isPending: isFetchingReport } = useMutation({
    mutationFn: () =>
      generateProductsReports({
        nameOrBarCode: filterProducts.textFilterByNameAndBarCode,
        orderBy: filterProducts.ordered,
        status: filterProducts.status,
        categoryId: filterProducts.categoryId,
        discount: filterProducts.discount,
      }),
  });

  const isLoadingProducts =
    isPendingProducts ||
    isFetchingProducts ||
    isLoadingFetchProducts ||
    isFetchingAddProducts ||
    isFetchingUpdateProduct ||
    isFetchingSupplierOptions ||
    isFetchingProductCategoriesOptions ||
    isFetchingSupplierOptions ||
    isFetchingReport;

  return {
    products,
    mutateReport,
    refetchProducts,
    suppliersOptions,
    mutateAddProduct,
    isLoadingProducts,
    mutateUpdateProduct,
    productCategoriesOptions,
  };
}
