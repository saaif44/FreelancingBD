declare const PrismaClient: any;
declare const prisma: any;
declare const serviceData: {
    title: string;
    description: string;
    standard_offer: number;
    premium_offer: number;
    butter_offer: number;
}[];
declare const jobData: {
    title: string;
    description: string;
    budget: number;
    deadline: Date;
    is_payment_verified: boolean;
    is_job_completed: boolean;
}[];
declare function insertDummyData(): Promise<void>;
