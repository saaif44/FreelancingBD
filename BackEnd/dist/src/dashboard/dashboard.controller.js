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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const dashboard_service_1 = require("./dashboard.service");
const client_1 = require("@prisma/client");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getDashboard(request) {
        const decodedToken = request.user;
        const senderId = decodedToken.userId;
        const userRole = await this.dashboardService.getUserRole(senderId);
        if (userRole === client_1.RoleType.FREELANCER) {
            const jobs = await this.dashboardService.getJobs();
            return jobs;
        }
        else {
            const services = await this.dashboardService.getServices();
            return services;
        }
    }
    async changeUserRole(request) {
        const decodedToken = request.user;
        const senderId = decodedToken.userId;
        const userRole = await this.dashboardService.getUserRole(senderId);
        if (userRole === client_1.RoleType.FREELANCER) {
            await this.dashboardService.changeUserRole(senderId, client_1.RoleType.CLIENT);
            return { message: 'User role changed to CLIENT' };
        }
        else {
            await this.dashboardService.changeUserRole(senderId, client_1.RoleType.FREELANCER);
            return { message: 'User role changed to FREELANCER' };
        }
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Post)('changerole'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "changeUserRole", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map