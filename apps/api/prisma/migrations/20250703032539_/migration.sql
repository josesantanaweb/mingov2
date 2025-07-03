/*
  Warnings:

  - You are about to drop the column `title` on the `MarketOption` table. All the data in the column will be lost.
  - Added the required column `name` to the `MarketOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MarketOption" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "time" SET DEFAULT now() + interval '1 hour';
