-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);
