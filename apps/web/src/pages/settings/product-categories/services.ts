import { requestApi } from '../../../services/api';
import { exctractErrorMessage } from '../../../services/error';
import { FormProductCategory } from './components/modal-add-product-category/types';
import { ProductCategoryResponse } from './types';

export async function getAllProductCategories({
  orderBy = '',
  name = '',
  page = 1,
  pageSize = 10,
  status = '',
}: {
  orderBy: string;
  name: string;
  page: number;
  pageSize: number;
  status?: string;
}) {
  try {
    const response = await requestApi.get<ProductCategoryResponse>(
      `/product-categories`,
      {
        params: {
          orderBy,
          name,
          page,
          pageSize,
          status,
        },
      },
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export const initialValues = {
  name: '',
  observation: '',
  active: false,
};

export async function addProductCategory(client: FormProductCategory) {
  try {
    const response = await requestApi.post<{ message: string; id: string }>(
      '/product-categories',
      client,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function updateProductCategory({
  id,
  ...rest
}: FormProductCategory & { id: string }) {
  try {
    const response = await requestApi.put<{ message: string; id: string }>(
      `/product-categories/${id}`,
      rest,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}
