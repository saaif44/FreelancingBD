-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_senderId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "senderId" DROP NOT NULL,
ALTER COLUMN "receiverId" DROP NOT NULL;
