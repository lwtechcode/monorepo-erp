import { requestApi } from '../../../services/api';
import { exctractErrorMessage } from '../../../services/error';
import { FormPaymentMethod } from './components/modal-payment-method/types';
import { PaymentMethodsOptionsResponse, PaymentMethodsResponse } from './types';

export async function getAllPaymentMethods({
  name,
  status,
  orderBy,
  page = 1,
  pageSize = 10,
}: {
  orderBy: string;
  name: string;
  page: number;
  pageSize: number;
  status?: string;
}) {
  try {
    const response = await requestApi.get<PaymentMethodsResponse>(
      `/payment-methods`,
      {
        params: {
          orderBy,
          name,
          page,
          pageSize,
          status,
        },
      },
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function getAllPaymentMethodsOptions() {
  try {
    const response = await requestApi.get<PaymentMethodsOptionsResponse>(
      `/payment-methods/options`,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export const initialValues = {
  name: '',
  tax: 0,
  observation: '',
  active: false,
};

export async function addPaymentMethod(client: FormPaymentMethod) {
  try {
    const response = await requestApi.post<{ message: string; id: string }>(
      '/payment-methods',
      client,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function updatePaymentMethod({
  id,
  ...rest
}: FormPaymentMethod & { id: string }) {
  try {
    const response = await requestApi.put<{ message: string; id: string }>(
      `/payment-methods/${id}`,
      rest,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}
