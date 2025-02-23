import { requestApi } from '../../services/api';
import { exctractErrorMessage } from '../../services/error';

export async function getUserData() {
  try {
    const response = await requestApi.get<{ usage_disk: number }>(`/user`);

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}
