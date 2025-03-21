export type FilterSaleBudgetsType = {
  textFilterByNameAndCpf: string;
  status?: string;
  ordered?: string;
};

export type SaleBudgetsProductType = {
  name: string;
  id: string;
  discounted_price: string;
  original_price: string;
  qty: string;
  product_id: string;
};

export type SaleBudgetsClientType = {
  name: string;
  cpf: string;
};

export type SaleBudgetsPaymentType = {
  name: string;
};

export type SaleBudgetsMadeType = Array<{
  id: string;
  status: number;
  active: boolean;
  total_value: string;
  discount_value: string;
  increase_value: string;
  tax_payment_value: string;
  client_id: string;
  payment_method_id: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  ProductSaleBudget: Array<SaleBudgetsProductType>;
  client: SaleBudgetsClientType | null;
  payment: SaleBudgetsPaymentType;
}>;

export type ResponseSalesType = {
  salesBudgets: SaleBudgetsMadeType;
  totalCount: number;
  totalPages: number;
};

export type BudgetIdMadeResponseTypes = {
  id: string;
  total_value: string;
  discount_value: string;
  increase_value: string;
  tax_payment_value: string;
  client_id: string;
  payment_method_id: string;
  observation: any;
  company_id: string;
  created_at: string;
  updated_at: string;
  active: boolean;
  client: ClientTypes;
  payment: PaymentTypes;
  products_sale_budgets: ProductsSaleBudgetType[];
};

export type ClientTypes = {
  name: string;
  cpf: string;
};

export type PaymentTypes = {
  name: string;
};

export type ProductsSaleBudgetType = {
  name: string;
  id: string;
  sale_price: number;
  discount_tax: number;
  bar_code: number;
  manufacturer: string;
  original_price: string;
  qty: string;
  product_id: string;
  total_value: string;
};
