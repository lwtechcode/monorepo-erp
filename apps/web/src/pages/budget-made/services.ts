import { requestApi } from '../../services/api';
import { exctractErrorMessage } from '../../services/error';
import { ResponseSalesType } from './types';

export async function getSaleBudgetsMade({
  status,
  orderBy,
  page = 1,
  nameOrCPF,
  pageSize = 10,
}: {
  orderBy: string;
  nameOrCPF: string;
  page: number;
  pageSize: number;
  status?: string;
}) {
  try {
    const response = await requestApi.get<ResponseSalesType>(`/sale-budgets`, {
      params: {
        orderBy,
        nameOrCPF,
        page,
        pageSize,
        status,
      },
    });

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}
