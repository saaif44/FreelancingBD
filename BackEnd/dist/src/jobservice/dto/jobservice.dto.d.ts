export declare class CreateJobDto {
    title: string;
    description: string;
    budget?: number;
    deadline?: string;
    is_payment_verified?: boolean;
    is_job_completed?: boolean;
    created_at?: Date;
    updated_at?: Date;
    client_profile_id?: number;
    freelancer_profile_id?: number;
    payslip?: any;
    constructor(createJobDto: CreateJobDto);
}
export declare class CreateServiceDto {
    title: string;
    description: string;
    standard_offer?: number;
    premium_offer?: number;
    butter_offer?: number;
    freelancer_profile_id?: number;
}
export declare class CreateBidDto {
    description: string;
    attachment: string;
    offer_time: number;
    offer_rate: number;
    freelancer_profile_id: number;
    jobId: number;
}
export declare class UpdateBidDto {
    description?: string;
    attachment?: string;
    offer_time?: number;
    offer_rate?: number;
}
export declare class ServiceFetchDto {
    id: number;
    title: string;
    description: string;
    standard_offer?: number;
    premium_offer?: number;
    butter_offer?: number;
    freelancer_profile_id?: number;
}
export declare class JobDFetchto {
    title: string;
    description: string;
    budget?: number;
    deadline?: Date;
    is_payment_verified?: boolean;
    is_job_completed?: boolean;
    created_at?: Date;
    updated_at?: Date;
    client_profile_id?: number;
    freelancer_profile_id?: number;
}
export declare class BidFetchto {
    id: number;
    freelancer_profile_id: number;
    job_id: number;
}
