import { RequestVerbEnum } from '../../enums';
import { Nullable } from '../../utils/types';

export type FilterProduct = {
  textFilterByNameAndBarCode: string;
  status: string;
  ordered: string;
  categoryId: string;
  discount?: boolean;
};

export type StateType = {
  form: FormProduct;
  type: RequestVerbEnum;
};

export type ProductTypes = {
  products: ProductResponseType[];
  totalPages: number;
  totalCount: number;
};

export type ProductResponseType = {
  id: string;
  name: string;
  stock?: number;
  supplier?: {
    name: string;
  };
  sku?: string;
  type?: string;
  cost_price: string;
  sale_price: string;
  manufacturer?: string;
  productCategory?: {
    name: string;
  };
  product_origin?: string;
  description?: string;
  location_in_store?: string;
  model?: string;
  product_category_id?: string;
  observation?: string;
  supplier_id?: string;
  discount_tax?: string;
  active?: boolean;
  bar_code?: string;
};

export type ProductType = {
  id?: string;
  name: string;
  bar_code?: string | null;
  cost_price: number;
  sale_price: number;
  product_category_id?: string | null;
  supplier_id?: string | null;
  manufacturer?: string | null;
  model?: string | null;
  product_origin?: string | null;
  sku?: string | null;
  location_in_store?: string | null;
  description?: string | null;
  stock?: number | null;
  observation?: string | null;
  discount_tax?: string | null;
  active?: boolean | null;
};

export type FormProduct = Partial<Nullable<ProductResponseType>>;
