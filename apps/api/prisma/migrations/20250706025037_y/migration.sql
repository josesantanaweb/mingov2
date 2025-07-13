-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "marketOptionId" TEXT;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "time" SET DEFAULT now() + interval '1 hour';

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_marketOptionId_fkey" FOREIGN KEY ("marketOptionId") REFERENCES "MarketOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;
