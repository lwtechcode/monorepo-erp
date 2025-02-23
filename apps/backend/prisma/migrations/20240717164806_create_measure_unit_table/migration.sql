-- AlterTable
ALTER TABLE "products" ADD COLUMN     "unitOfMeasurementId" TEXT;

-- CreateTable
CREATE TABLE "units_of_measurement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "units_of_measurement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_unitOfMeasurementId_fkey" FOREIGN KEY ("unitOfMeasurementId") REFERENCES "units_of_measurement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units_of_measurement" ADD CONSTRAINT "units_of_measurement_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
