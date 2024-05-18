import { PrismaService } from '../prisma/prisma.service';
import { RoleType } from '@prisma/client';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserRole(userId: number): Promise<RoleType>;
    getJobs(): Promise<{
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
    }[]>;
    getServices(): Promise<{
        id: number;
        title: string;
        description: string;
        standard_offer: number;
        premium_offer: number;
        butter_offer: number;
        freelancer_profile_id: number;
    }[]>;
    changeUserRole(userId: number, newRole: RoleType): Promise<void>;
}
