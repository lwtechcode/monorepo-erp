import { ProductSaleDTO } from "./product-sale.dto";

export type SaleDTO = {
  discount_value: number;
  increase_value: number;
  payment_method_id: string;
  client_id?: string;
  products: ProductSaleDTO[];
};
