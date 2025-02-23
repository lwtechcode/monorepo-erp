import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  addUnitOfMeasurement,
  getAllUnitOfMeasurements,
  updateUnitOfMeasurement,
} from '../services';
import { FilterUnitOfMeasurement } from '../types';

type UnitOfMeasurementMutationProps = {
  selectedPage: number;
  debounceSearchTerm: string;
  filterUnitOfMeasurement: FilterUnitOfMeasurement;
  setIsVisibleModalAddUnitOfMeasurement: (isVisible: boolean) => void;
};

export default function useUnitOfMeasurementMutation({
  selectedPage,
  debounceSearchTerm,
  filterUnitOfMeasurement,
  setIsVisibleModalAddUnitOfMeasurement,
}: UnitOfMeasurementMutationProps) {
  const {
    data: unitOfMeasurements,
    mutate: mutateGetAllUnitOfMeasurements,
    isPending: isFetchingUnitOfMeasurements,
  } = useMutation({
    mutationFn: () =>
      getAllUnitOfMeasurements({
        status: filterUnitOfMeasurement.status,
        orderBy: filterUnitOfMeasurement.ordered,
        name: debounceSearchTerm,
        page: selectedPage,
        pageSize: 20,
      }),
  });

  const {
    mutate: mutateAddUnitOfMeasurement,
    isPending: isFetchingAddUnitOfMeasurements,
  } = useMutation({
    mutationFn: addUnitOfMeasurement,
    onSuccess: () => {
      mutateGetAllUnitOfMeasurements();
      setIsVisibleModalAddUnitOfMeasurement(false);
    },
  });

  const {
    mutate: mutateUpdateUnitOfMeasurement,
    isPending: isFetchingUpdateUnitOfMeasurement,
  } = useMutation({
    mutationFn: updateUnitOfMeasurement,
    onSuccess: () => {
      mutateGetAllUnitOfMeasurements();
      setIsVisibleModalAddUnitOfMeasurement(false);
    },
  });

  useEffect(() => {
    mutateGetAllUnitOfMeasurements();
  }, [
    mutateGetAllUnitOfMeasurements,
    selectedPage,
    filterUnitOfMeasurement,
    debounceSearchTerm,
  ]);

  return {
    unitOfMeasurements,
    mutateGetAllUnitOfMeasurements,
    isFetchingUnitOfMeasurements,
    mutateAddUnitOfMeasurement,
    mutateUpdateUnitOfMeasurement,
    isFetchingAddUnitOfMeasurements,
    isFetchingUpdateUnitOfMeasurement,
  };
}
