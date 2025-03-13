export type ResponseChartsDashboardTypes = {
  salesPerMonth: SalesPerMonthTypes[];
  topProductsSelling: TopProductsSellingTypes[];
  paymentMethodPercentage: PaymentMethodPercentageTypes[];
  topClients: TopClientTypes[];
  topSellingCategories: TopSellingCategoryTypes[];
  salesLastSevenDays: SalesLastSevenDayTypes[];
};

export type ResponseNotificationsDashboardTypes = {
  overdueAccountsPayable: Array<{
    id: string;
    description: string;
    due_date: string;
    pay_date: string | null;
    value: string;
    added_value: string;
    status: number;
    creditor: string;
    recurrence: string | null;
    number_of_installments: string | null;
    installment: string | null;
    observation: string;
    company_id: string;
    created_at: string;
    updated_at: string;
  }>;
  dueTodayAccountsPayable: Array<any>;
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
