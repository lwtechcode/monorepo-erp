"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopClients = exports.getPaymentMethodPercentage = exports.getTopSellingProducts = exports.getMonthlyRevenue = void 0;
exports.getTopSellingCategories = getTopSellingCategories;
exports.getSalesLast7Days = getSalesLast7Days;
exports.getOverdueAccountsPayable = getOverdueAccountsPayable;
exports.getDueTodayAccountsPayable = getDueTodayAccountsPayable;
const date_fns_1 = require("date-fns");
const prisma_1 = require("../database/prisma");
const formatters_1 = require("../utils/formatters");
const getMonthlyRevenue = async (companyId) => {
    var _a;
    const now = new Date();
    const sales = await prisma_1.prisma.sale.groupBy({
        by: ['created_at'],
        where: {
            company_id: companyId,
            created_at: {
                gte: (0, date_fns_1.subMonths)(now, 12), // Filtra apenas vendas dos últimos 12 meses
            },
            status: 1, // Apenas vendas concluídas
        },
        _sum: {
            total_value: true,
        },
        orderBy: {
            created_at: 'asc',
        },
    });
    // Formata os dados agrupando por mês e preenchendo meses sem vendas
    const monthlyRevenue = [];
    for (let i = 11; i >= 0; i--) {
        const month = (0, date_fns_1.format)((0, date_fns_1.subMonths)(now, i), 'MM/yyyy');
        const revenue = ((_a = sales.find((sale) => (0, date_fns_1.format)(sale.created_at, 'MM/yyyy') === month)) === null || _a === void 0 ? void 0 : _a._sum.total_value) || 0;
        monthlyRevenue.push({ month, revenue: Number(revenue) });
    }
    return monthlyRevenue;
};
exports.getMonthlyRevenue = getMonthlyRevenue;
const getTopSellingProducts = async (company_id) => {
    const topProducts = await prisma_1.prisma.productSale.groupBy({
        by: ['product_id'],
        _sum: {
            qty: true,
        },
        orderBy: {
            _sum: {
                qty: 'desc',
            },
        },
        take: 10,
    });
    const productsWithDetails = await Promise.all(topProducts.map(async (product) => {
        const productDetails = await prisma_1.prisma.product.findUnique({
            where: { id: product.product_id, company_id },
            select: {
                id: true,
                name: true,
            },
        });
        return {
            id: productDetails === null || productDetails === void 0 ? void 0 : productDetails.id,
            name: productDetails === null || productDetails === void 0 ? void 0 : productDetails.name,
            total_sold: Number(product._sum.qty),
        };
    }));
    return productsWithDetails;
};
exports.getTopSellingProducts = getTopSellingProducts;
const getPaymentMethodPercentage = async (companyId) => {
    const totalSales = await prisma_1.prisma.sale.count({
        where: {
            company_id: companyId,
            status: 1, // Apenas vendas concluídas
        },
    });
    if (totalSales === 0)
        return [];
    const salesByPaymentMethod = await prisma_1.prisma.sale.groupBy({
        by: ['payment_method_id'],
        _count: {
            payment_method_id: true,
        },
        where: {
            company_id: companyId,
            status: 1,
        },
    });
    // Obtém os nomes dos métodos de pagamento
    const paymentMethods = await prisma_1.prisma.paymentMethod.findMany({
        where: {
            id: { in: salesByPaymentMethod.map((sale) => sale.payment_method_id) },
        },
        select: {
            id: true,
            name: true,
        },
    });
    return salesByPaymentMethod.map((sale) => {
        const paymentMethod = paymentMethods.find((pm) => pm.id === sale.payment_method_id);
        return {
            payment_method: paymentMethod ? paymentMethod.name : 'Desconhecido',
            percentage: (sale._count.payment_method_id / totalSales) * 100,
        };
    });
};
exports.getPaymentMethodPercentage = getPaymentMethodPercentage;
const getTopClients = async (companyId, limit = 10) => {
    // Primeira consulta para obter os totais agrupados por cliente
    const salesData = await prisma_1.prisma.sale.groupBy({
        by: ['client_id'],
        _sum: { total_value: true },
        where: { company_id: companyId, status: 1 },
        orderBy: { _sum: { total_value: 'desc' } },
        take: limit,
    });
    // Filtra os client_ids, removendo valores null
    const clientIds = salesData
        .map((sale) => sale.client_id)
        .filter((clientId) => clientId !== null);
    // Segunda consulta para buscar os nomes dos clientes
    const clients = await prisma_1.prisma.client.findMany({
        where: {
            id: { in: clientIds },
        },
        select: {
            id: true,
            name: true,
        },
    });
    // Combinar os dados de vendas com os nomes dos clientes
    const topClients = salesData.map((sale) => {
        const client = clients.find((client) => client.id === sale.client_id);
        return {
            client_id: sale.client_id,
            total_value: sale._sum.total_value,
            client_name: client ? client.name : 'Unknown', // Se o cliente não for encontrado
        };
    });
    return topClients;
};
exports.getTopClients = getTopClients;
async function getTopSellingCategories(companyId, limit = 5) {
    var _a;
    try {
        // Obter o total de vendas da empresa
        const totalSalesResult = await prisma_1.prisma.sale.aggregate({
            where: {
                company_id: companyId,
            },
            _sum: {
                total_value: true,
            },
        });
        const totalSalesValue = ((_a = totalSalesResult._sum.total_value) === null || _a === void 0 ? void 0 : _a.toNumber()) || 0;
        // Obter as categorias de produtos mais vendidas, com valor total de vendas e quantidade
        const result = await prisma_1.prisma.productCategory.findMany({
            where: {
                company_id: companyId,
            },
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        Product: true,
                    },
                },
                Product: {
                    select: {
                        ProductSale: {
                            select: {
                                original_price: true,
                                discounted_price: true,
                                qty: true,
                            },
                        },
                    },
                },
            },
            take: limit,
        });
        // Calcular o valor total de vendas e a porcentagem para cada categoria
        const categoriesWithSales = result.map((category) => {
            let categorySalesValue = 0;
            category.Product.forEach((product) => {
                product.ProductSale.forEach((sale) => {
                    categorySalesValue +=
                        sale.discounted_price.toNumber() * sale.qty.toNumber(); // Converte Decimal para number
                });
            });
            const salesPercentage = totalSalesValue > 0 ? (categorySalesValue / totalSalesValue) * 100 : 0;
            return {
                category_id: category.id,
                category_name: category.name,
                total_sales_value: categorySalesValue,
                sales_percentage: salesPercentage,
            };
        });
        return categoriesWithSales;
    }
    catch (error) {
        console.error('Error fetching top selling categories:', error);
        throw new Error('Could not retrieve top selling categories');
    }
}
async function getSalesLast7Days(companyId) {
    try {
        // Obter a data atual e calcular a data dos últimos 7 dias
        const currentDate = new Date();
        const last7Days = new Date();
        last7Days.setDate(currentDate.getDate() - 7); // Subtrai 7 dias da data atual
        // Consultar as vendas nos últimos 7 dias e agrupar por dia
        const sales = await prisma_1.prisma.sale.groupBy({
            by: ['created_at'], // Agrupar pelas datas das vendas
            where: {
                company_id: companyId,
                created_at: {
                    gte: last7Days, // Filtra as vendas a partir dos últimos 7 dias
                },
            },
            _sum: {
                total_value: true, // Soma o valor total das vendas
            },
            orderBy: {
                created_at: 'asc', // Ordena as vendas pela data
            },
        });
        // Criar uma lista dos últimos 7 dias
        const allDates = Array.from({ length: 7 }).map((_, i) => {
            const date = new Date();
            date.setDate(currentDate.getDate() - (6 - i)); // Cria os 7 dias, começando pelo mais recente
            return date.toISOString().split('T')[0]; // Formata a data no formato YYYY-MM-DD
        });
        // Mapear vendas para o formato esperado
        const formattedSales = allDates.map((date) => {
            var _a;
            const sale = sales.find((sale) => sale.created_at.toISOString().split('T')[0] === date);
            return {
                date_day: (0, formatters_1.formatDate)(new Date(date)),
                value_sale: sale ? ((_a = sale._sum.total_value) === null || _a === void 0 ? void 0 : _a.toNumber()) || 0 : 0,
            };
        });
        return formattedSales;
    }
    catch (error) {
        console.error('Error fetching sales for last 7 days:', error);
        throw new Error('Could not retrieve sales for last 7 days');
    }
}
async function getOverdueAccountsPayable(companyId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const notifyAccountsPayable = await prisma_1.prisma.billToPay.findMany({
        where: {
            company_id: companyId,
            due_date: {
                lt: today,
            },
        },
    });
    return notifyAccountsPayable === null || notifyAccountsPayable === void 0 ? void 0 : notifyAccountsPayable.map(({ description, due_date, value, status }) => ({
        description: description,
        due_date: (0, formatters_1.formatDate)(due_date),
        value: (0, formatters_1.formatMoney)(Number(value)),
        status,
    }));
}
async function getDueTodayAccountsPayable(companyId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const notifyTodayAccountsPayable = await prisma_1.prisma.billToPay.findMany({
        where: {
            company_id: companyId,
            due_date: {
                gte: today,
                lt: tomorrow,
            },
        },
    });
    return notifyTodayAccountsPayable === null || notifyTodayAccountsPayable === void 0 ? void 0 : notifyTodayAccountsPayable.map(({ description, due_date, value, status }) => ({
        description: description,
        due_date: (0, formatters_1.formatDate)(due_date),
        value: (0, formatters_1.formatMoney)(Number(value)),
        status,
    }));
}
exports.default = {
    getMonthlyRevenue: exports.getMonthlyRevenue,
    getTopSellingProducts: exports.getTopSellingProducts,
    getPaymentMethodPercentage: exports.getPaymentMethodPercentage,
    getTopClients: exports.getTopClients,
    getTopSellingCategories,
    getSalesLast7Days,
    getOverdueAccountsPayable,
    getDueTodayAccountsPayable,
};
