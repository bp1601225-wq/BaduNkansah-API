/*
  Warnings:

  - A unique constraint covering the columns `[stationaryId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stationaryId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "stationaryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Stationaries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "StockStatus" NOT NULL,
    "destription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stationaries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_stationaryId_key" ON "Inventory"("stationaryId");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_stationaryId_fkey" FOREIGN KEY ("stationaryId") REFERENCES "Stationaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
