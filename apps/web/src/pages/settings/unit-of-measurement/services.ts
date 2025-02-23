import { requestApi } from '../../../services/api';
import { exctractErrorMessage } from '../../../services/error';
import { FormUnitOfMeasurement } from './components/modal-add-unit-of-measurement/types';
import { UnitOfMeasurementResponse } from './types';

export async function getAllUnitOfMeasurements({
  orderBy = '',
  name = '',
  page = 1,
  pageSize = 10,
  status = '',
}: {
  name?: string;
  page?: number;
  status?: string;
  orderBy?: string;
  pageSize?: number;
}) {
  try {
    const response = await requestApi.get<UnitOfMeasurementResponse>(
      `/units_of_measurement`,
      {
        params: {
          name,
          page,
          status,
          orderBy,
          pageSize,
        },
      },
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export const initialValues = {
  name: '',
  abbreviation: '',
  active: false,
};

export async function addUnitOfMeasurement(client: FormUnitOfMeasurement) {
  try {
    const response = await requestApi.post<{ message: string; id: string }>(
      '/units_of_measurement',
      client,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function updateUnitOfMeasurement({
  id,
  ...rest
}: FormUnitOfMeasurement & { id: string }) {
  try {
    const response = await requestApi.put<{ message: string; id: string }>(
      `/units_of_measurement/${id}`,
      rest,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}
