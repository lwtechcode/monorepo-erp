import { requestApi } from '../../services/api';
import { exctractErrorMessage } from '../../services/error';
import { FormProduct, ProductResponseType, ProductTypes } from './types';

export const initialValues: ProductResponseType = {
  id: '',
  name: '',
  cost_price: '',
  sale_price: '',
  product_category_id: '',
  supplier_id: '',
  discount_tax: '',
  manufacturer: '',
  model: '',
  product_origin: '',
  sku: '',
  location_in_store: '',
  description: '',
  stock: 0,
  observation: '',
  bar_code: '',
};

export async function getAllProducts({
  orderBy = '',
  nameOrBarCode = '',
  page = 1,
  categoryId = '',
  pageSize = 10,
  status = '',
  discount = false,
}: {
  orderBy: string;
  nameOrBarCode: string;
  page: number;
  pageSize: number;
  status?: string;
  categoryId?: string;
  discount?: boolean;
}) {
  try {
    const response = await requestApi.get<ProductTypes>(`/products`, {
      params: {
        nameOrBarCode,
        orderBy,
        page,
        pageSize,
        status,
        categoryId,
        discount,
      },
    });

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function getAllProductCategoriesOptions() {
  try {
    const response = await requestApi.get<{ label: string; value: string }[]>(
      `/product-categories/options`,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function getAllSuppliersOptions() {
  try {
    const response =
      await requestApi.get<{ label: string; value: string }[]>(
        `/suppliers/options`,
      );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function generateProductReports({
  orderBy = '',
  nameOrCPF = '',
  status = '',
}: {
  orderBy: string;
  nameOrCPF: string;
  status?: string;
}) {
  try {
    const response = await requestApi.get(
      `/clients/report?orderBy=${orderBy}&nameOrCPF=${nameOrCPF}&status=${status}`,
      {
        responseType: 'blob',
      },
    );

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Relatório de Clientes.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function addProduct(product: FormProduct) {
  try {
    const response = await requestApi.post<{ id: string; message: string }>(
      '/products',
      product,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function updateProduct({
  id,
  ...rest
}: FormProduct & { id: string }) {
  try {
    const response = await requestApi.put<{ id: string; message: string }>(
      `/products/${id}`,
      rest,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function generateProductsReports({
  orderBy = '',
  nameOrBarCode = '',
  status = '',
  categoryId = '',
  discount = false,
}: {
  orderBy: string;
  nameOrBarCode: string;
  status?: string;
  categoryId?: string;
  discount?: boolean;
}) {
  try {
    const response = await requestApi.get(
      `/products/report?orderBy=${orderBy}&nameOrBarCode=${nameOrBarCode}&status=${status}&categoryId=${categoryId}&discount=${discount}`,
      {
        responseType: 'blob',
      },
    );

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Relatório de Produtos.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}
