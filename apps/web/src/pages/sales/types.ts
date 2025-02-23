export type StateProducts = Array<ProductState>;

export type ProductState = {
  id: string | null;
  product: string | null;
  value_unit: string | null;
  total_value: string | null;
  quantity: string | null;
  bar_code?: string | null;
  discount_amount?: string | null;
  discount_tax?: string | null;
};
