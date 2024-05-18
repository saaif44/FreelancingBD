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
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let JobService = class JobService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createJob(createJobDto) {
        return this.prisma.job.create({
            data: createJobDto,
        });
    }
    async createService(createServiceDto) {
        return this.prisma.service.create({
            data: createServiceDto,
        });
    }
    async createBid(createBidDto) {
        const { description, attachment, offer_time, offer_rate, freelancer_profile_id, jobId } = createBidDto;
        try {
            return await this.prisma.bid.create({
                data: {
                    description,
                    attachment,
                    offer_time,
                    offer_rate,
                    FreelancerProfile: { connect: { id: freelancer_profile_id } },
                    Job: { connect: { id: jobId } },
                },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.BadRequestException('You have already bidded on this job.');
            }
            throw error;
        }
    }
    async getAllJobs() {
        const jobs = await this.prisma.job.findMany({
            select: {
                title: true,
                description: true,
                budget: true,
                deadline: true,
                is_payment_verified: true,
                is_job_completed: true,
                created_at: true,
                updated_at: true,
                client_profile_id: true,
                freelancer_profile_id: true,
            },
        });
        return jobs;
    }
    async getAllServices() {
        const services = await this.prisma.service.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                standard_offer: true,
                premium_offer: true,
                butter_offer: true,
                freelancer_profile_id: true,
            },
        });
        return services;
    }
    async getAllBids() {
        return this.prisma.bid.findMany();
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JobService);
//# sourceMappingURL=jobservice.service.js.map