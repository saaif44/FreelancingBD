/*
  Warnings:

  - A unique constraint covering the columns `[freelancer_profile_id,jobId]` on the table `bids` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "bids_freelancer_profile_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "bids_freelancer_profile_id_jobId_key" ON "bids"("freelancer_profile_id", "jobId");
