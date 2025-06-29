/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `Market` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Market" DROP COLUMN "totalAmount";

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "time" SET DEFAULT now() + interval '1 hour';
