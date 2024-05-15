-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_bidFileId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_message_id_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_senderId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_serviceId_fkey";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "message_id" DROP NOT NULL,
ALTER COLUMN "bidFileId" DROP NOT NULL,
ALTER COLUMN "serviceId" DROP NOT NULL,
ALTER COLUMN "recipientId" DROP NOT NULL,
ALTER COLUMN "senderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_bidFileId_fkey" FOREIGN KEY ("bidFileId") REFERENCES "Bid"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
