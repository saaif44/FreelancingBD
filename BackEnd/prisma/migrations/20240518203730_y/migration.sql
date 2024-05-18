-- DropForeignKey
ALTER TABLE "bids" DROP CONSTRAINT "bids_freelancer_profile_id_fkey";

-- AlterTable
ALTER TABLE "bids" ALTER COLUMN "freelancer_profile_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_freelancer_profile_id_fkey" FOREIGN KEY ("freelancer_profile_id") REFERENCES "FreelancerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
