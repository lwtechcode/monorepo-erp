/*
  Warnings:

  - You are about to drop the column `observation` on the `products_sale_budget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products_sale_budget" DROP COLUMN "observation";

-- AlterTable
ALTER TABLE "sales_budgets" ADD COLUMN     "observation" TEXT;
