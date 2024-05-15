/*
  Warnings:

  - A unique constraint covering the columns `[senderId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receiverId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_senderId_key" ON "Transaction"("senderId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_receiverId_key" ON "Transaction"("receiverId");
