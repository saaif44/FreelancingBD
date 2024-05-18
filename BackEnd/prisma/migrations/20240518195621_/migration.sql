/*
  Warnings:

  - You are about to alter the column `offer_rate` on the `bids` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "bids" ALTER COLUMN "offer_rate" SET DATA TYPE INTEGER;
