/*
  Warnings:

  - Added the required column `userId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_sender_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "sender" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
