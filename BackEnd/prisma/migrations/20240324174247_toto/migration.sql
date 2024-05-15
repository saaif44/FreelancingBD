/*
  Warnings:

  - You are about to drop the column `owner_user_id` on the `File` table. All the data in the column will be lost.
  - Added the required column `recipientId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_owner_user_id_fkey";

-- DropIndex
DROP INDEX "Transaction_senderId_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "owner_user_id",
ADD COLUMN     "recipientId" INTEGER NOT NULL,
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
