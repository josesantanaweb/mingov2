/*
  Warnings:

  - You are about to drop the column `marketOptionId` on the `Bet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bet" DROP CONSTRAINT "Bet_marketOptionId_fkey";

-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "marketOptionId";

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "time" SET DEFAULT now() + interval '1 hour';
