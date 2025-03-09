/*
  Warnings:

  - You are about to drop the column `validated_at` on the `companies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "validated_at",
ADD COLUMN     "validate_code_register_at" TIMESTAMP(3);
