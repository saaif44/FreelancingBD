import { ProfileService } from './profile.service';
import { CreateProfileDto, EditProfileDto, UserDataDto } from './dto/profile.dto';
import { Request } from 'express';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    createProfile(createProfileDto: CreateProfileDto, request: Request): Promise<{
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
    editProfile(editProfileDto: EditProfileDto, id: number, request: Request): Promise<{
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
    getUserData(request: Request, UserDataDto: UserDataDto): Promise<{
        username: string;
        role: import(".prisma/client").$Enums.RoleType;
        balance: import("@prisma/client/runtime/library").Decimal;
        language_known: string;
        nationality: string;
        phone_number: string;
        address: string;
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
