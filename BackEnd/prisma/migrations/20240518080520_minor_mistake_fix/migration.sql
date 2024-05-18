/*
  Warnings:

  - You are about to drop the column `job_id` on the `bids` table. All the data in the column will be lost.
  - Added the required column `jobId` to the `bids` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bids" DROP CONSTRAINT "bids_job_id_fkey";

-- AlterTable
ALTER TABLE "bids" DROP COLUMN "job_id",
ADD COLUMN     "jobId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
