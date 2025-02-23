import { prisma } from '../database/prisma';
import { ProductSaleBudgetDTO } from '../dto/product-sale-budget.dto';

export type ProductEntity = ProductSaleBudgetDTO & {
  name: string;
  original_price: number;
  discounted_price: number;
  qty: number;
  company_id: string;
  product_id: string;
  sales_budget_id: string;
};

async function create(data: ProductEntity) {
  return prisma.productSaleBudget.create({
    data: {
      discounted_price: data.discounted_price,
      name: data.name,
      original_price: data.original_price,
      qty: data.qty,
      company_id: data.company_id,
      product_id: data.product_id,
      sales_budget_id: data.sales_budget_id,
    },
  });
}

export default { create };
