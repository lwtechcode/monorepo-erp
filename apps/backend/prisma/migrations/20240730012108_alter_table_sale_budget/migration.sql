/*
  Warnings:

  - You are about to drop the column `sale_id` on the `products_sale_budget` table. All the data in the column will be lost.
  - You are about to drop the column `salesBudgetId` on the `products_sale_budget` table. All the data in the column will be lost.
  - Added the required column `sales_budget_id` to the `products_sale_budget` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products_sale_budget" DROP CONSTRAINT "products_sale_budget_sale_id_fkey";

-- DropForeignKey
ALTER TABLE "products_sale_budget" DROP CONSTRAINT "products_sale_budget_salesBudgetId_fkey";

-- AlterTable
ALTER TABLE "products_sale_budget" DROP COLUMN "sale_id",
DROP COLUMN "salesBudgetId",
ADD COLUMN     "sales_budget_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "products_sale_budget" ADD CONSTRAINT "products_sale_budget_sales_budget_id_fkey" FOREIGN KEY ("sales_budget_id") REFERENCES "sales_budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
