export type ProductCategoryResponse = {
  productCategories: ProductCategory[];
  totalPages: number;
  totalCount: number;
};

export type ProductCategory = {
  id: string;
  name: string;
  observation?: string;
  active: boolean;
};

export type FilterProductCategory = {
  name: string;
  status?: string;
  ordered: string;
};
