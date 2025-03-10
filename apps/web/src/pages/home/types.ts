export type ResponseChartsDashboardTypes = {
  salesPerMonth: SalesPerMonthTypes[];
  topProductsSelling: TopProductsSellingTypes[];
  paymentMethodPercentage: PaymentMethodPercentageTypes[];
  topClients: TopClientTypes[];
  topSellingCategories: TopSellingCategoryTypes[];
  salesLastSevenDays: SalesLastSevenDayTypes[];
};

export type SalesPerMonthTypes = {
  month: string;
  revenue: number;
};

export type TopProductsSellingTypes = {
  id: string;
  name: string;
  total_sold: number;
};

export type PaymentMethodPercentageTypes = {
  payment_method: string;
  percentage: number;
};

export type TopClientTypes = {
  client_id?: string;
  total_value: string;
  client_name: string;
};

export type TopSellingCategoryTypes = {
  category_id: string;
  category_name: string;
  total_sales_value: number;
  sales_percentage: number;
};

export type SalesLastSevenDayTypes = {
  date_day: string;
  value_sale: number;
};
