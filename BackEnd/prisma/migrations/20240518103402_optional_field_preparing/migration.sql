-- AlterTable
ALTER TABLE "bids" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "attachment" DROP NOT NULL,
ALTER COLUMN "offer_time" DROP NOT NULL,
ALTER COLUMN "offer_rate" DROP NOT NULL;