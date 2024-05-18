/*
  Warnings:

  - You are about to alter the column `budget` on the `jobs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "jobs" ALTER COLUMN "budget" SET DATA TYPE INTEGER;
