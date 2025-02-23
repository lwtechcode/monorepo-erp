import { requestApi } from '../../services/api';
import { exctractErrorMessage } from '../../services/error';

type AddSaleType = {
  client_id: string;
  payment_method_id: string;
  discount?: number | null;
  sale_budget_id?: string | null;
  products: Array<{
    id: string | null;
    qty: number | null;
    discounted_price?: number | null; //TO DO: Valor redondo do desconto total do produto!
  }>;
};

type AddSaleResponse = {
  id: string;
  message: string;
};

export async function addSale(sale: AddSaleType) {
  try {
    const response = await requestApi.post<AddSaleResponse>('/sales', sale);

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
