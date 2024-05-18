/*
  Warnings:

  - Added the required column `jobFileId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "jobFileId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_jobFileId_fkey" FOREIGN KEY ("jobFileId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
