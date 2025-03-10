import { Request, Response } from 'express';
import {
  getMonthlyRevenue,
  getPaymentMethodPercentage,
  getTopClients,
  getTopSellingCategories,
  getTopSellingProducts,
  getSalesLast7Days,
  getOverdueAccountsPayable,
  getDueTodayAccountsPayable,
} from '../services/dashboard.service';

export async function dashboard(request: Request, response: Response) {
  const company_id = request.company_id;

  try {
    const salesPerMonth = await getMonthlyRevenue(company_id);
    const topProductsSelling = await getTopSellingProducts(company_id);
    const paymentMethodPercentage =
      await getPaymentMethodPercentage(company_id);

    const topClients = await getTopClients(company_id);
    const topSellingCategories = await getTopSellingCategories(company_id);
    const salesLastSevenDays = await getSalesLast7Days(company_id);

    return response.json({
      salesPerMonth,
      topProductsSelling,
      paymentMethodPercentage,
      topClients,
      topSellingCategories,
      salesLastSevenDays,
    });
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function notifications(request: Request, response: Response) {
  const company_id = request.company_id;

  try {
    const overdueAccountsPayable = await getOverdueAccountsPayable(company_id);

    const dueTodayAccountsPayable =
      await getDueTodayAccountsPayable(company_id);

    return response.json({
      overdueAccountsPayable,
      dueTodayAccountsPayable,
    });
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
}

export default { dashboard, notifications };
