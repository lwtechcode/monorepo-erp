import { requestApi } from '../../services/api';
import { exctractErrorMessage } from '../../services/error';
import { FormSupplierType, SuppliersResponse } from './types';

export const initialValues = {
  address: '',
  cep: '',
  city: '',
  complement: '',
  cnpj: '',
  email: '',
  name: '',
  neighborhood: '',
  number: '',
  phone: '',
  state: '',
  observation: '',
  id: '',
};

export async function getAllSuppliers({
  orderBy = '',
  nameOrCNPJ = '',
  page = 1,
  pageSize = 10,
  status = '',
}: {
  orderBy: string;
  nameOrCNPJ: string;
  page: number;
  pageSize: number;
  status?: string;
}) {
  try {
    const response = await requestApi.get<SuppliersResponse>(`/suppliers`, {
      params: {
        orderBy,
        nameOrCNPJ,
        page,
        pageSize,
        status,
      },
    });

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function addSupplier(supplier: FormSupplierType) {
  try {
    const response = await requestApi.post<SuppliersResponse>(
      '/suppliers',
      supplier,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function updateSupplier({
  id,
  ...rest
}: FormSupplierType & { id: string }) {
  try {
    const response = await requestApi.put<SuppliersResponse>(
      `/suppliers/${id}`,
      rest,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function generateSuppliersReports({
  textFilterByNameAndCnpj,
  ordered,
  status,
}: {
  textFilterByNameAndCnpj?: string;
  ordered?: string;
  status?: string;
}) {
  try {
    const response = await requestApi.get(`/suppliers/report`, {
      responseType: 'blob',
      params: {
        textFilterByNameAndCnpj,
        ordered,
        status,
      },
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Relatório de Fornecedores.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}
