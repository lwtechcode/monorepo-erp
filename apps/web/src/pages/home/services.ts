import { requestApi } from '../../services/api';
import { exctractErrorMessage } from '../../services/error';
import { ResponseChartsDashboardTypes } from './types';

export async function getUserData() {
  try {
    const response = await requestApi.get<{ usage_disk: number }>(`/user`);

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function getChartsDashboard() {
  try {
    const response =
      await requestApi.get<ResponseChartsDashboardTypes>(`/dashboard`);

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}

export async function getNotificationsDashboard() {
  try {
    const response = await requestApi.get<ResponseChartsDashboardTypes>(
      `/dashboard/notifications`,
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(await exctractErrorMessage(error));
  }
}
