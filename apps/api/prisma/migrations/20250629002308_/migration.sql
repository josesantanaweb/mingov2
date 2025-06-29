-- DropForeignKey
ALTER TABLE "Market" DROP CONSTRAINT "Market_matchId_fkey";

-- AlterTable
ALTER TABLE "Market" ALTER COLUMN "matchId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "time" SET DEFAULT now() + interval '1 hour';

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;
