import { JobService } from './jobservice.service';
import { CreateJobDto, CreateServiceDto, CreateBidDto, UpdateBidDto } from './dto/jobservice.dto';
export declare class JobController {
    private jobService;
    constructor(jobService: JobService);
    createJob(createJobDto: CreateJobDto): Promise<{
        id: number;
        title: string;
        description: string;
        budget: import("@prisma/client/runtime/library").Decimal;
        deadline: Date;
        is_payment_verified: boolean;
        is_job_completed: boolean;
        created_at: Date;
        updated_at: Date;
        client_profile_id: number;
        freelancer_profile_id: number;
    }>;
}
export declare class ServiceController {
    private jobService;
    constructor(jobService: JobService);
    createService(createServiceDto: CreateServiceDto): Promise<{
        id: number;
        title: string;
        description: string;
        standard_offer: import("@prisma/client/runtime/library").Decimal;
        premium_offer: import("@prisma/client/runtime/library").Decimal;
        butter_offer: import("@prisma/client/runtime/library").Decimal;
        freelancer_profile_id: number;
    }>;
    createBid(createBidDto: CreateBidDto): Promise<{
        id: number;
        description: string;
        attachment: string;
        offer_time: number;
        offer_rate: import("@prisma/client/runtime/library").Decimal;
        created_at: Date;
        updated_at: Date;
        freelancer_profile_id: number;
    }>;
    updateBid(id: string, updateBidDto: UpdateBidDto): Promise<{
        id: number;
        description: string;
        attachment: string;
        offer_time: number;
        offer_rate: import("@prisma/client/runtime/library").Decimal;
        created_at: Date;
        updated_at: Date;
        freelancer_profile_id: number;
    }>;
}
