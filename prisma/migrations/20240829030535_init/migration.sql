-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "Measure" (
    "measure_uuid" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL,
    "measure_type" "MeasureType" NOT NULL,
    "measure_value" INTEGER NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("measure_uuid")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customer_code_key" ON "Customer"("customer_code");

-- AddForeignKey
ALTER TABLE "Measure" ADD CONSTRAINT "Measure_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
