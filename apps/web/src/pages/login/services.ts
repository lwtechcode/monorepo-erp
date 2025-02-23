import { requestApi } from '../../services/api';
import { exctractErrorMessage } from '../../services/error';

export async function handleAuth({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await requestApi.post('/auth/login', { email, password });
    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}
