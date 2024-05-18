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
        const { description, attachment, offer_time, offer_rate, userId, jobId } = createBidDto;
        const freelancerProfile = await this.prisma.freelancerProfile.findUnique({
            where: { userId: userId },
        });
        if (!freelancerProfile) {
            throw new Error('FreelancerProfile with the specified userId does not exist');
        }
        const existingBid = await this.prisma.bid.findFirst({
            where: {
                freelancer_profile_id: freelancerProfile.userId,
                jobId: jobId,
            },
        });
        if (existingBid) {
            throw new common_1.BadRequestException('You have already made a bid for this job.');
        }
        return this.prisma.bid.create({
            data: {
                description,
                attachment,
                offer_time,
                offer_rate,
                FreelancerProfile: {
                    connect: {
                        id: freelancerProfile.id,
                    },
                },
                job: {
                    connect: {
                        id: jobId,
                    },
                },
            },
        });
    }
    async updateBid(id, updateBidDto) {
        return this.prisma.bid.update({
            where: { id },
            data: updateBidDto,
        });
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JobService);
//# sourceMappingURL=jobservice.service.js.map