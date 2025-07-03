/*
  Warnings:

  - You are about to drop the column `description` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Market` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Market" DROP COLUMN "description",
DROP COLUMN "icon",
DROP COLUMN "name",
DROP COLUMN "status",
ADD COLUMN     "marketTypeId" TEXT;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "time" SET DEFAULT now() + interval '1 hour';

-- CreateTable
CREATE TABLE "MarketType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_marketTypeId_fkey" FOREIGN KEY ("marketTypeId") REFERENCES "MarketType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
