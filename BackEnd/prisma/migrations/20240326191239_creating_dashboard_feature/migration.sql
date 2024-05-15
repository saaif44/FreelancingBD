-- AlterTable
ALTER TABLE "ClientProfile" ALTER COLUMN "review" DROP NOT NULL,
ALTER COLUMN "ratings" DROP NOT NULL,
ALTER COLUMN "avg_budget" DROP NOT NULL,
ALTER COLUMN "created_jobs" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FreelancerProfile" ALTER COLUMN "review" DROP NOT NULL,
ALTER COLUMN "ratings" DROP NOT NULL,
ALTER COLUMN "hourly_rate" DROP NOT NULL,
ALTER COLUMN "completed_jobs" DROP NOT NULL,
ALTER COLUMN "created_services" DROP NOT NULL,
ALTER COLUMN "active_jobs" DROP NOT NULL;
