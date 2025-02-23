import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  addProductCategory,
  getAllProductCategories,
  updateProductCategory,
} from '../services';
import { FilterProductCategory } from '../types';

type ProductCategoryMutationProps = {
  filterProductCategories: FilterProductCategory;
  debounceSearchTerm: string;
  selectedPage: number;
  setIsVisibleModalAddProductCategory: (isVisible: boolean) => void;
};

export default function useProductCategoriesMutation({
  filterProductCategories,
  debounceSearchTerm,
  selectedPage,
  setIsVisibleModalAddProductCategory,
}: ProductCategoryMutationProps) {
  const {
    data: productCategories,
    mutate: mutateGetAllProductCategories,
    isPending: isFetchingProductCategories,
  } = useMutation({
    mutationFn: () =>
      getAllProductCategories({
        status: filterProductCategories.status,
        orderBy: filterProductCategories.ordered,
        name: debounceSearchTerm,
        page: selectedPage,
        pageSize: 20,
      }),
  });

  const {
    mutate: mutateAddProductCategory,
    isPending: isFetchingAddProductCategories,
  } = useMutation({
    mutationFn: addProductCategory,

    onSuccess: () => {
      mutateGetAllProductCategories();
      setIsVisibleModalAddProductCategory(false);
    },
  });

  const {
    mutate: mutateUpdateProductCategory,
    isPending: isFetchingUpdateProductCategory,
  } = useMutation({
    mutationFn: updateProductCategory,

    onSuccess: (response) => {
      mutateGetAllProductCategories();
      setIsVisibleModalAddProductCategory(false);
    },
  });

  useEffect(() => {
    mutateGetAllProductCategories();
  }, [
    mutateGetAllProductCategories,
    selectedPage,
    filterProductCategories,
    debounceSearchTerm,
  ]);

  return {
    productCategories,
    mutateGetAllProductCategories,
    isFetchingProductCategories,
    mutateAddProductCategory,
    mutateUpdateProductCategory,
    isFetchingAddProductCategories,
    isFetchingUpdateProductCategory,
  };
}
