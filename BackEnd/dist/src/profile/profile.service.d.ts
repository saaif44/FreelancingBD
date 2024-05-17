import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto, EditProfileDto, UserDataDto, updateUserDto } from './dto/profile.dto';
import { Prisma } from '@prisma/client';
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    createProfile(userId: number, data: CreateProfileDto): Promise<{
        FreelancerProfile: {
            id: number;
            review: string;
            ratings: number;
            hourly_rate: Prisma.Decimal;
            completed_jobs: number;
            created_services: number;
            active_jobs: number;
            userId: number;
        };
        ClientProfile: {
            id: number;
            review: string;
            ratings: number;
            avg_budget: Prisma.Decimal;
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
        balance: Prisma.Decimal;
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
            hourly_rate: Prisma.Decimal;
            completed_jobs: number;
            created_services: number;
            active_jobs: number;
            userId: number;
        };
        ClientProfile: {
            id: number;
            review: string;
            ratings: number;
            avg_budget: Prisma.Decimal;
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
        balance: Prisma.Decimal;
        language_known: string;
        nationality: string;
        address: string;
        phone_number: string;
        nid_number: string;
        avatarUrl: string;
    }>;
    getUserData(userId: number, data: UserDataDto): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.RoleType;
        balance: Prisma.Decimal;
        language_known: string;
        nationality: string;
        address: string;
        phone_number: string;
        FreelancerProfile: {
            id: number;
            review: string;
            ratings: number;
            hourly_rate: Prisma.Decimal;
            completed_jobs: number;
            created_services: number;
            active_jobs: number;
            userId: number;
        };
        ClientProfile: {
            id: number;
            review: string;
            ratings: number;
            avg_budget: Prisma.Decimal;
            created_jobs: number;
            userId: number;
        };
    }>;
    getAllUserData(): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        created_at: Date;
        updated_at: Date;
        role: import(".prisma/client").$Enums.RoleType;
        balance: Prisma.Decimal;
        language_known: string;
        nationality: string;
        address: string;
        phone_number: string;
        nid_number: string;
        avatarUrl: string;
    }[]>;
    deleteUser(id: number): Promise<boolean>;
    updateUser(userId: number, id: number, data: updateUserDto): Promise<boolean>;
}
