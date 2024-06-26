"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ProfileService = class ProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProfile(userId, data) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                username: data.name,
                role: data.role,
                language_known: data.language_known,
                nationality: data.nationality,
                address: data.address,
                phone_number: data.phone_number,
            },
            include: {
                FreelancerProfile: true,
                ClientProfile: true,
            },
        });
    }
    async editProfile(userId, id, data) {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: {
                    username: data.name,
                    language_known: data.language_known,
                    nationality: data.nationality,
                    address: data.address,
                    phone_number: data.phone_number,
                    email: data.email,
                },
                include: {
                    FreelancerProfile: true,
                    ClientProfile: true,
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const target = error.meta?.target;
                    if (target.includes('email')) {
                        throw new common_1.HttpException('Email already exists', common_1.HttpStatus.CONFLICT);
                    }
                    else if (target.includes('phone_number')) {
                        throw new common_1.HttpException('Phone number already exists', common_1.HttpStatus.CONFLICT);
                    }
                }
            }
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserData(userId, data) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                username: true,
                role: true,
                language_known: true,
                nationality: true,
                address: true,
                phone_number: true,
                balance: true,
                FreelancerProfile: true,
                ClientProfile: true,
                email: true,
                password: true,
                id: true,
            },
        });
    }
    async getAllUserData() {
        return this.prisma.user.findMany({});
    }
    async deleteUser(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        await this.prisma.user.delete({
            where: { id },
        });
        return true;
    }
    async updateUser(userId, id, data) {
        try {
            await this.prisma.user.update({
                where: { id },
                data,
            });
            return true;
        }
        catch (error) {
            console.error('Error updating user:', error);
            return false;
        }
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map