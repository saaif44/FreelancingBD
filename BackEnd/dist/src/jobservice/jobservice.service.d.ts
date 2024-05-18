import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto, CreateServiceDto, CreateBidDto, JobDFetchto, ServiceFetchDto } from './dto/jobservice.dto';
import { Bid } from '@prisma/client';
export declare class JobService {
    private prisma;
    constructor(prisma: PrismaService);
    createJob(createJobDto: CreateJobDto): Promise<{
        id: number;
        title: string;
        description: string;
        budget: number;
        deadline: Date;
        is_payment_verified: boolean;
        is_job_completed: boolean;
        created_at: Date;
        updated_at: Date;
        client_profile_id: number;
        freelancer_profile_id: number;
    }>;
    createService(createServiceDto: CreateServiceDto): Promise<{
        id: number;
        title: string;
        description: string;
        standard_offer: number;
        premium_offer: number;
        butter_offer: number;
        freelancer_profile_id: number;
    }>;
    createBid(createBidDto: CreateBidDto): Promise<{
        id: number;
        description: string;
        attachment: string;
        offer_time: number;
        offer_rate: number;
        created_at: Date;
        updated_at: Date;
        freelancer_profile_id: number;
        jobId: number;
    }>;
    getAllJobs(): Promise<JobDFetchto[]>;
    getAllServices(): Promise<ServiceFetchDto[]>;
    getAllBids(): Promise<Bid[]>;
}
