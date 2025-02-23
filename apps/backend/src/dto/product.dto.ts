export type ProductDTO = {
  id?: string;
  name: string;
  sku?: string;
  bar_code?: string;
  manufacturer?: string;
  category?: string;
  product_origin?: string;
  cost_price: number;
  sale_price: number;
  margin: number;
  taxes?: number;
  discount_tax?: number;
  stock?: number;
  min_stock?: number;
  initial_stock?: number;
  manage_stock?: boolean;
  description?: string;
  observation?: string;
  location_in_store?: string;
  model?: string;
  active?: boolean;
  deleted?: boolean;
  user_company_id: string;
  supplier_id?: string;
  product_category_id: string;
};
