import { requestApi } from '../../services/api';
import { exctractErrorMessage } from '../../services/error';
import { BillToReceiveResponse, FormBillToReceive } from './types';

export const INITIAL_VALUES = {
  added_value: '',
  client_id: '',
  company_id: '',
  description: '',
  due_date: '',
  id: '',
  installment: '',
  number_of_installments: '',
  observation: '',
  pay_date: '',
  payment_method_id: '',
  recurrence: false,
  status: '',
  value: '',
};

export async function getAllBillsToReceive({
  page = 1,
  pageSize = 20,
  description = '',
  startDate,
  endDate,
  status = '',
}: {
  description: string;
  page: number;
  pageSize: number;
  startDate: string;
  endDate: string;
  status: string;
}) {
  try {
    const response = await requestApi.get<BillToReceiveResponse>(
      `/bills-to-receive`,
      {
        params: {
          page,
          pageSize,
          description,
          startDate,
          endDate,
          status,
        },
      },
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function generateBillsToReceiveReports({
  description,
  startDate,
  endDate,
}: {
  description?: string;
  startDate?: string;
  endDate?: string;
}) {
  try {
    const response = await requestApi.get(`/bills-to-receive/report`, {
      responseType: 'blob',
      params: {
        description,
        startDate,
        endDate,
      },
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Relatório de Contas a Receber.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function addBillToReceive(billToReceive: FormBillToReceive) {
  try {
    const response = await requestApi.post<{ id: string; message: string }>(
      `/bills-to-receive`,
      billToReceive,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function updateBillToReceive({
  id,
  ...rest
}: FormBillToReceive & { id: string }) {
  try {
    const response = await requestApi.put<{ id: string; message: string }>(
      `/bills-to-receive/${id}`,
      rest,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function getAllClientsOptions() {
  try {
    const response =
      await requestApi.get<{ value: string; label: string }[]>(
        `/clients/options`,
      );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function getAllPaymentMethodsOptions() {
  try {
    const response = await requestApi.get<
      { value: string; label: string; tax: string | null }[]
    >(`/payment-methods/options`);

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}
