export type PaymentMethodsResponse = {
  paymentMethods: PaymentMethod[];
  totalPages: number;
  totalCount: number;
};

export type PaymentMethodsOptionsResponse = Array<{
  value: string;
  label: string;
}>;

export type PaymentMethod = {
  id: string;
  name: string;
  observation?: string;
  active: boolean;
  tax: string;
};

export type FilterPaymentMethods = {
  name: string;
  status?: string;
  ordered: string;
};
