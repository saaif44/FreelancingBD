import { Request } from 'express';
import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(request: Request): Promise<{
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
    }[] | {
        id: number;
        title: string;
        description: string;
        standard_offer: number;
        premium_offer: number;
        butter_offer: number;
        freelancer_profile_id: number;
    }[]>;
    changeUserRole(request: Request): Promise<{
        message: string;
    }>;
}
