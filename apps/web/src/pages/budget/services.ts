import { requestApi } from '../../services/api';
import { exctractErrorMessage } from '../../services/error';

type AddSaleBudgetsType = {
  payment_method_id: string;
  client_id: string;
  discount_value?: number | null;
  increase_value?: number | null;
  products: Array<{
    id: string | null;
    qty: number | null;
    discounted_price?: number | null; //TO DO: Valor redondo do desconto total do produto!
  }>;
};

type AddSaleBudgetsResponse = {
  id: string;
  message: string;
};

export async function addSaleBudget(sale: AddSaleBudgetsType) {
  try {
    const response = await requestApi.post<AddSaleBudgetsResponse>(
      '/sale-budgets',
      sale,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function pdf(sale: { id: string }) {
  try {
    const response = await requestApi.get<any>(`/sales/${sale.id}/coupon`);

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}
