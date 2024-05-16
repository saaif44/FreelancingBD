import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto, EditProfileDto, UserDataDto } from './dto/profile.dto';
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    createProfile(userId: number, data: CreateProfileDto): Promise<{
        FreelancerProfile: {
            id: number;
            review: string;
            ratings: number;
            hourly_rate: import("@prisma/client/runtime/library").Decimal;
            completed_jobs: number;
            created_services: number;
            active_jobs: number;
            userId: number;
        };
        ClientProfile: {
            id: number;
            review: string;
            ratings: number;
            avg_budget: import("@prisma/client/runtime/library").Decimal;
            created_jobs: number;
            userId: number;
        };
    } & {
        id: number;
        username: string;
        email: string;
        password: string;
        created_at: Date;
        updated_at: Date;
        role: import(".prisma/client").$Enums.RoleType;
        balance: import("@prisma/client/runtime/library").Decimal;
        language_known: string;
        nationality: string;
        address: string;
        phone_number: string;
        nid_number: string;
        avatarUrl: string;
    }>;
    editProfile(userId: number, id: number, data: EditProfileDto): Promise<{
        FreelancerProfile: {
            id: number;
            review: string;
            ratings: number;
            hourly_rate: import("@prisma/client/runtime/library").Decimal;
            completed_jobs: number;
            created_services: number;
            active_jobs: number;
            userId: number;
        };
        ClientProfile: {
            id: number;
            review: string;
            ratings: number;
            avg_budget: import("@prisma/client/runtime/library").Decimal;
            created_jobs: number;
            userId: number;
        };
    } & {
        id: number;
        username: string;
        email: string;
        password: string;
        created_at: Date;
        updated_at: Date;
        role: import(".prisma/client").$Enums.RoleType;
        balance: import("@prisma/client/runtime/library").Decimal;
        language_known: string;
        nationality: string;
        address: string;
        phone_number: string;
        nid_number: string;
        avatarUrl: string;
    }>;
    getUserData(userId: any, data: UserDataDto): Promise<{
        username: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.RoleType;
        balance: import("@prisma/client/runtime/library").Decimal;
        language_known: string;
        nationality: string;
        address: string;
        phone_number: string;
        FreelancerProfile: {
            id: number;
            review: string;
            ratings: number;
            hourly_rate: import("@prisma/client/runtime/library").Decimal;
            completed_jobs: number;
            created_services: number;
            active_jobs: number;
            userId: number;
        };
        ClientProfile: {
            id: number;
            review: string;
            ratings: number;
            avg_budget: import("@prisma/client/runtime/library").Decimal;
            created_jobs: number;
            userId: number;
        };
    }>;
}
