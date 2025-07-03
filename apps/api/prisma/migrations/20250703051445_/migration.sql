/*
  Warnings:

  - Made the column `matchId` on table `Market` required. This step will fail if there are existing NULL values in that column.
  - Made the column `marketTypeId` on table `Market` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Market" DROP CONSTRAINT "Market_marketTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Market" DROP CONSTRAINT "Market_matchId_fkey";

-- AlterTable
ALTER TABLE "Market" ALTER COLUMN "matchId" SET NOT NULL,
ALTER COLUMN "marketTypeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "time" SET DEFAULT now() + interval '1 hour';

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_marketTypeId_fkey" FOREIGN KEY ("marketTypeId") REFERENCES "MarketType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
