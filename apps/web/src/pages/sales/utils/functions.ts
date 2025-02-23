import { StateProducts } from '../types';

export function calcTaxDiscount(discount_tax: string, sale_price: string) {
  const valueTax = parseInt(discount_tax || '0');
  const valueProduct = parseInt(sale_price || '0');

  const valueDiscount = (valueTax * valueProduct) / 100;

  return valueProduct - valueDiscount;
}

export function calcTotalListProducts(products: StateProducts) {
  let total = 0;
  let qtyTotal = 0;
  let discountAmountTotal = 0;
  let grossValue = 0;

  products.forEach(({ total_value, quantity, discount_amount }) => {
    total += Number(total_value);
    qtyTotal += Number(quantity);
    discountAmountTotal += Number(discount_amount);
    grossValue += Number(total_value);
  });

  return { total, qtyTotal, discountAmountTotal, grossValue };
}
