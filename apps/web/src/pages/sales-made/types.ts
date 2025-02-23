export type FilterSalesType = {
  textFilterByNameAndCpf: string;
  status?: string;
  ordered?: string;
};

export type SaleProductType = {
  name: string;
  id: string;
  discounted_price: string;
  original_price: string;
  qty: string;
  product_id: string;
};

export type SaleClientType = {
  name: string;
  cpf: string;
};

export type SalePaymentType = {
  name: string;
};

export type SalesMadeType = Array<{
  id: string;
  status: number;
  total_value: string;
  discount_value: string;
  increase_value: string;
  tax_payment_value: string;
  client_id: string;
  payment_method_id: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  ProductSale: Array<SaleProductType>;
  client: SaleClientType | null;
  payment: SalePaymentType;
}>;

export type ResponseSalesType = {
  sales: SalesMadeType;
  totalCount: number;
  totalPages: number;
};
