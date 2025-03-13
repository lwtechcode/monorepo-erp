"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = dashboard;
exports.notifications = notifications;
const dashboard_service_1 = require("../services/dashboard.service");
async function dashboard(request, response) {
    const company_id = request.company_id;
    try {
        const salesPerMonth = await (0, dashboard_service_1.getMonthlyRevenue)(company_id);
        const topProductsSelling = await (0, dashboard_service_1.getTopSellingProducts)(company_id);
        const paymentMethodPercentage = await (0, dashboard_service_1.getPaymentMethodPercentage)(company_id);
        const topClients = await (0, dashboard_service_1.getTopClients)(company_id);
        const topSellingCategories = await (0, dashboard_service_1.getTopSellingCategories)(company_id);
        const salesLastSevenDays = await (0, dashboard_service_1.getSalesLast7Days)(company_id);
        return response.json({
            salesPerMonth,
            topProductsSelling,
            paymentMethodPercentage,
            topClients,
            topSellingCategories,
            salesLastSevenDays,
        });
    }
    catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}
async function notifications(request, response) {
    const company_id = request.company_id;
    try {
        const overdueAccountsPayable = await (0, dashboard_service_1.getOverdueAccountsPayable)(company_id);
        const dueTodayAccountsPayable = await (0, dashboard_service_1.getDueTodayAccountsPayable)(company_id);
        return response.json({
            overdueAccountsPayable,
            dueTodayAccountsPayable,
        });
    }
    catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.default = { dashboard, notifications };
