import { subMonths, format } from 'date-fns';
import { prisma } from '../database/prisma';

export const getMonthlyRevenue = async (companyId: string) => {
  const now = new Date();

  const sales = await prisma.sale.groupBy({
    by: ['created_at'],
    where: {
      company_id: companyId,
      created_at: {
        gte: subMonths(now, 12), // Filtra apenas vendas dos últimos 12 meses
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
  const monthlyRevenue: { month: string; revenue: number }[] = [];

  for (let i = 11; i >= 0; i--) {
    const month = format(subMonths(now, i), 'yyyy-MM');
    const revenue =
      sales.find((sale) => format(sale.created_at, 'yyyy-MM') === month)?._sum
        .total_value || 0;

    monthlyRevenue.push({ month, revenue: Number(revenue) });
  }

  return monthlyRevenue;
};

export const getTopSellingProducts = async (company_id: string) => {
  const topProducts = await prisma.productSale.groupBy({
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

  const productsWithDetails = await Promise.all(
    topProducts.map(async (product) => {
      const productDetails = await prisma.product.findUnique({
        where: { id: product.product_id, company_id },
        select: {
          id: true,
          name: true,
        },
      });

      return {
        id: productDetails?.id,
        name: productDetails?.name,
        totalSold: product._sum.qty,
      };
    }),
  );

  return productsWithDetails;
};

export const getPaymentMethodPercentage = async (companyId: string) => {
  const totalSales = await prisma.sale.count({
    where: {
      company_id: companyId,
      status: 1, // Apenas vendas concluídas
    },
  });

  if (totalSales === 0) return [];

  const salesByPaymentMethod = await prisma.sale.groupBy({
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
  const paymentMethods = await prisma.paymentMethod.findMany({
    where: {
      id: { in: salesByPaymentMethod.map((sale) => sale.payment_method_id) },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return salesByPaymentMethod.map((sale) => {
    const paymentMethod = paymentMethods.find(
      (pm) => pm.id === sale.payment_method_id,
    );
    return {
      paymentMethod: paymentMethod ? paymentMethod.name : 'Desconhecido',
      percentage:
        ((sale._count.payment_method_id / totalSales) * 100).toFixed(2) + '%',
    };
  });
};

export const getTopClients = async (companyId: string, limit = 10) => {
  // Primeira consulta para obter os totais agrupados por cliente
  const salesData = await prisma.sale.groupBy({
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
  const clients = await prisma.client.findMany({
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

export async function getTopSellingCategories(
  companyId: string,
  limit: number = 5,
) {
  try {
    // Obter o total de vendas da empresa
    const totalSalesResult = await prisma.sale.aggregate({
      where: {
        company_id: companyId,
      },
      _sum: {
        total_value: true,
      },
    });

    const totalSalesValue = totalSalesResult._sum.total_value?.toNumber() || 0;

    // Obter as categorias de produtos mais vendidas, com valor total de vendas e quantidade
    const result = await prisma.productCategory.findMany({
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

      const salesPercentage =
        totalSalesValue > 0 ? (categorySalesValue / totalSalesValue) * 100 : 0;

      return {
        categoryId: category.id,
        categoryName: category.name,
        totalSalesValue: categorySalesValue,
        salesPercentage: salesPercentage,
      };
    });

    return categoriesWithSales;
  } catch (error) {
    console.error('Error fetching top selling categories:', error);
    throw new Error('Could not retrieve top selling categories');
  }
}

export async function getSalesLast7Days(companyId: string) {
  try {
    // Obter a data atual e calcular a data dos últimos 7 dias
    const currentDate = new Date();
    const last7Days = new Date();
    last7Days.setDate(currentDate.getDate() - 7); // Subtrai 7 dias da data atual

    // Consultar as vendas nos últimos 7 dias e agrupar por dia
    const sales = await prisma.sale.groupBy({
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
      const sale = sales.find(
        (sale) => sale.created_at.toISOString().split('T')[0] === date,
      );
      return {
        dataDoDia: date,
        ValorVendido: sale ? sale._sum.total_value?.toNumber() || 0 : 0,
      };
    });

    return formattedSales;
  } catch (error) {
    console.error('Error fetching sales for last 7 days:', error);
    throw new Error('Could not retrieve sales for last 7 days');
  }
}

export async function getOverdueAccountsPayable(companyId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return await prisma.billToPay.findMany({
    where: {
      company_id: companyId,
      due_date: {
        lt: today,
      },
    },
  });
}

export default {
  getMonthlyRevenue,
  getTopSellingProducts,
  getPaymentMethodPercentage,
  getTopClients,
  getTopSellingCategories,
  getSalesLast7Days,
  getOverdueAccountsPayable,
};
