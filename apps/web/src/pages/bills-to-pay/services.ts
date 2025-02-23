import { requestApi } from '../../services/api';
import { exctractErrorMessage } from '../../services/error';
import { BillToPayResponse, FormBillToPay } from './types';

export const initialValues = {
  added_value: 0,
  creditor: '',
  description: '',
  due_date: '',
  number_of_installments: 0,
  observation: '',
  pay_date: '',
  recurrence: false,
  value: 0,
};

export async function getAllBillsToPay({
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
    const response = await requestApi.get<BillToPayResponse>(
      `/bills-to-pay?page=${page}&pageSize=${pageSize}&description=${description}&startDate=${startDate}&endDate=${endDate}&status=${status}`,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function generateBillsToPayReports({
  description,
  startDate,
  endDate,
}: {
  description?: string;
  startDate?: string;
  endDate?: string;
}) {
  try {
    const response = await requestApi.get(`/bills-to-pay/report`, {
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
    a.download = 'Relatório de Contas a Pagar.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function addBillToPay(billToPay: FormBillToPay) {
  try {
    const response = await requestApi.post<{ id: string; message: string }>(
      `/bills-to-pay`,
      billToPay,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function updateBillToPay({
  id,
  ...rest
}: FormBillToPay & { id: string }) {
  try {
    const response = await requestApi.put<{ id: string; message: string }>(
      `/bills-to-pay/${id}`,
      rest,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}
