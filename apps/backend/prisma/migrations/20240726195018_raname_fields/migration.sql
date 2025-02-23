/*
  Warnings:

  - You are about to drop the column `clientId` on the `bills_to_receive` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bills_to_receive" DROP CONSTRAINT "bills_to_receive_clientId_fkey";

-- AlterTable
ALTER TABLE "bills_to_receive" DROP COLUMN "clientId",
ADD COLUMN     "client_id" TEXT;

-- AddForeignKey
ALTER TABLE "bills_to_receive" ADD CONSTRAINT "bills_to_receive_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
