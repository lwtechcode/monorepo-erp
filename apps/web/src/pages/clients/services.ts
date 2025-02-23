import { requestApi } from '../../services/api';
import { exctractErrorMessage } from '../../services/error';
import { buildQueryFilters } from '../../utils/functions';
import { ClientResponse, CreateClient } from './types';

export const initialValues = {
  address: '',
  birthDate: '',
  cep: '',
  city: '',
  complement: '',
  cpf: '',
  email: '',
  gender: '',
  name: '',
  neighborhood: '',
  number: '',
  phone: '',
  rg: '',
  state: '',
  observation: '',
  id: '',
  active: false,
};

type getAllClientsParamsTypes = Partial<{
  orderBy: string;
  nameOrCPF: string;
  page: number;
  pageSize: number;
  status: string;
}>;

type generateClientReportsParamsTypes = Pick<
  getAllClientsParamsTypes,
  'nameOrCPF' | 'orderBy' | 'status'
>;

export async function getAllClients(params: getAllClientsParamsTypes) {
  try {
    const response = await requestApi.get<ClientResponse>(
      `/clients${buildQueryFilters(params)}`,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function generateClientReports(
  params: generateClientReportsParamsTypes,
) {
  try {
    const response = await requestApi.get(
      `/clients/report${buildQueryFilters(params)}`,
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

export async function addClient(client: CreateClient) {
  try {
    const response = await requestApi.post<ClientResponse>('/clients', client);

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function updateClient({
  id,
  ...rest
}: CreateClient & { id: string }) {
  try {
    const response = await requestApi.put<ClientResponse>(
      `/clients/${id}`,
      rest,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}
