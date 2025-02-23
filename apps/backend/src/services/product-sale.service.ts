import { prisma } from "../database/prisma";
import { ProductSaleDTO } from "../dto/product-sale.dto";

export type ProductEntity = ProductSaleDTO & {
  name: string;
  original_price: number;
  discounted_price: number;
  qty: number;
  company_id: string;
  product_id: string;
  sale_id: string;
};

async function create(data: ProductEntity) {
  return prisma.productSale.create({
    data: {
      discounted_price: data.discounted_price,
      name: data.name,
      original_price: data.original_price,
      qty: data.qty,
      company_id: data.company_id,
      product_id: data.product_id,
      sale_id: data.sale_id,
    },
  });
}

export default { create };
