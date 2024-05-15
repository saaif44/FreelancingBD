-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_client_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_freelancer_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_freelancer_profile_id_fkey";

-- DropIndex
DROP INDEX "Job_client_profile_id_key";

-- DropIndex
DROP INDEX "Job_freelancer_profile_id_key";

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "budget" DROP NOT NULL,
ALTER COLUMN "deadline" DROP NOT NULL,
ALTER COLUMN "is_payment_verified" DROP NOT NULL,
ALTER COLUMN "is_job_completed" DROP NOT NULL,
ALTER COLUMN "client_profile_id" DROP NOT NULL,
ALTER COLUMN "freelancer_profile_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "freelancer_profile_id" DROP NOT NULL;
