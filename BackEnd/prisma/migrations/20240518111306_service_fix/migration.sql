/*
  Warnings:

  - You are about to alter the column `standard_offer` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `premium_offer` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `butter_offer` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "standard_offer" DROP NOT NULL,
ALTER COLUMN "standard_offer" SET DATA TYPE INTEGER,
ALTER COLUMN "premium_offer" DROP NOT NULL,
ALTER COLUMN "premium_offer" SET DATA TYPE INTEGER,
ALTER COLUMN "butter_offer" DROP NOT NULL,
ALTER COLUMN "butter_offer" SET DATA TYPE INTEGER;
