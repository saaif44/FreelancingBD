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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const jobservice_service_1 = require("./jobservice.service");
const jobservice_dto_1 = require("./dto/jobservice.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let JobController = class JobController {
    constructor(jobService) {
        this.jobService = jobService;
    }
    async createJob(createJobDto) {
        return this.jobService.createJob(createJobDto);
    }
    async createService(createServiceDto) {
        return this.jobService.createService(createServiceDto);
    }
    async createBid(createBidDto, request) {
        try {
            return await this.jobService.createBid(createBidDto);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
    async getAllServices() {
        return this.jobService.getAllServices();
    }
    async getAllJobs() {
        return this.jobService.getAllJobs();
    }
    async getAllBids() {
        return this.jobService.getAllBids();
    }
};
exports.JobController = JobController;
__decorate([
    (0, common_1.Post)('createjob'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [jobservice_dto_1.CreateJobDto]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createJob", null);
__decorate([
    (0, common_1.Post)('createservice'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [jobservice_dto_1.CreateServiceDto]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createService", null);
__decorate([
    (0, common_1.Post)('createbid'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [jobservice_dto_1.CreateBidDto, Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createBid", null);
__decorate([
    (0, common_1.Get)('services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getAllServices", null);
__decorate([
    (0, common_1.Get)('jobs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getAllJobs", null);
__decorate([
    (0, common_1.Get)('bids'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getAllBids", null);
exports.JobController = JobController = __decorate([
    (0, common_1.Controller)('jobservice'),
    __metadata("design:paramtypes", [jobservice_service_1.JobService])
], JobController);
//# sourceMappingURL=jobservice.controller.js.map