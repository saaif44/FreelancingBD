/*
  Warnings:

  - You are about to drop the `Bid` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_freelancer_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_bidFileId_fkey";

-- DropTable
DROP TABLE "Bid";

-- CreateTable
CREATE TABLE "bids" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "offer_time" INTEGER NOT NULL,
    "offer_rate" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "freelancer_profile_id" INTEGER NOT NULL,

    CONSTRAINT "bids_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bids_freelancer_profile_id_key" ON "bids"("freelancer_profile_id");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_bidFileId_fkey" FOREIGN KEY ("bidFileId") REFERENCES "bids"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_freelancer_profile_id_fkey" FOREIGN KEY ("freelancer_profile_id") REFERENCES "FreelancerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
