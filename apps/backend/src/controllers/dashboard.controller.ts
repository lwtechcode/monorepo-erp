import { Request, Response } from 'express';
import {
  getMonthlyRevenue,
  getPaymentMethodPercentage,
  getTopClients,
  getTopSellingCategories,
  getTopSellingProducts,
  getSalesLast7Days,
} from '../services/dashboard.service';

export async function dashboard(request: Request, response: Response) {
  const company_id = request.company_id;

  //FATURAMENTO MENSAL DOS ÚLTIMOS 12 MESES.

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

export default { dashboard };
