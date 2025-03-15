import { requestApi } from '../../services/api';
import { exctractErrorMessage } from '../../services/error';
import { RequestRegisterTypes } from './types';

export async function handleRegister(params: RequestRegisterTypes) {
  try {
    const response = await requestApi.post('/auth/register', { ...params });
    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}
