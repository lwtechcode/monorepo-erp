-- CreateTable
CREATE TABLE "bills_to_receive" (
    "id" TEXT NOT NULL,
    "status" INTEGER DEFAULT 1,
    "value" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "due_date" TIMESTAMP(3) NOT NULL,
    "receipt_date" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "clientId" TEXT,
    "observation" TEXT,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "bills_to_receive_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bills_to_receive" ADD CONSTRAINT "bills_to_receive_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills_to_receive" ADD CONSTRAINT "bills_to_receive_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
