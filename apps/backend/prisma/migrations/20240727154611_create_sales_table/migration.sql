-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "total_value" DECIMAL(19,2) NOT NULL DEFAULT 0,
    "discount_value" DECIMAL(19,2) NOT NULL DEFAULT 0,
    "increase_value" DECIMAL(19,2) NOT NULL DEFAULT 0,
    "tax_payment_value" DECIMAL(19,2) NOT NULL DEFAULT 0,
    "client_id" TEXT,
    "paymentMethod_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_sale" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "original_price" DECIMAL(19,2) NOT NULL,
    "discounted_price" DECIMAL(19,2) NOT NULL,
    "qty" DECIMAL(19,2) NOT NULL,
    "product_id" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "products_sale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_paymentMethod_id_fkey" FOREIGN KEY ("paymentMethod_id") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_sale" ADD CONSTRAINT "products_sale_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_sale" ADD CONSTRAINT "products_sale_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_sale" ADD CONSTRAINT "products_sale_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
