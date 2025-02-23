-- AlterTable
ALTER TABLE "products_sale" ADD COLUMN     "salesBudgetId" TEXT;

-- CreateTable
CREATE TABLE "sales_budgets" (
    "id" TEXT NOT NULL,
    "total_value" DECIMAL(19,2) NOT NULL DEFAULT 0,
    "discount_value" DECIMAL(19,2) NOT NULL DEFAULT 0,
    "increase_value" DECIMAL(19,2) NOT NULL DEFAULT 0,
    "tax_payment_value" DECIMAL(19,2) NOT NULL DEFAULT 0,
    "client_id" TEXT,
    "payment_method_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "sales_budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_sale_budget" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "original_price" DECIMAL(19,2) NOT NULL,
    "discounted_price" DECIMAL(19,2) NOT NULL,
    "qty" DECIMAL(19,2) NOT NULL,
    "product_id" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "observation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "salesBudgetId" TEXT,

    CONSTRAINT "products_sale_budget_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products_sale" ADD CONSTRAINT "products_sale_salesBudgetId_fkey" FOREIGN KEY ("salesBudgetId") REFERENCES "sales_budgets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_budgets" ADD CONSTRAINT "sales_budgets_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_budgets" ADD CONSTRAINT "sales_budgets_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_budgets" ADD CONSTRAINT "sales_budgets_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_sale_budget" ADD CONSTRAINT "products_sale_budget_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_sale_budget" ADD CONSTRAINT "products_sale_budget_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_sale_budget" ADD CONSTRAINT "products_sale_budget_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_sale_budget" ADD CONSTRAINT "products_sale_budget_salesBudgetId_fkey" FOREIGN KEY ("salesBudgetId") REFERENCES "sales_budgets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
