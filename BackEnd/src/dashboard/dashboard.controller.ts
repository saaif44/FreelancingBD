// dashboard/dashboard.controller.ts
interface DecodedToken {
    userId: number;
}



import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DashboardService } from './dashboard.service';
import { RoleType } from '@prisma/client';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboard(@Req() request: Request) {

    const decodedToken = request.user as DecodedToken;
    const senderId = decodedToken.userId;


    // Check user's role
    const userRole = await this.dashboardService.getUserRole(senderId);

    if (userRole === RoleType.FREELANCER) {
      // Fetch jobs for freelancer dashboard
      const jobs = await this.dashboardService.getJobs();
      return jobs;
    } else {
      // Redirect to services endpoint for client dashboard
      const services = await this.dashboardService.getServices();
      return services;
    }
  }

  @Post('changerole')
  async changeUserRole(@Req() request: Request) {
    const decodedToken = request.user as DecodedToken;
    const senderId = decodedToken.userId;


    const userRole = await this.dashboardService.getUserRole(senderId);
    
    if (userRole === RoleType.FREELANCER) {
    // Change user's role to CLIENT
    await this.dashboardService.changeUserRole(senderId, RoleType.CLIENT);
    return { message: 'User role changed to CLIENT' };
    }
    else {
    // Change user's role to FREELANCER
    await this.dashboardService.changeUserRole(senderId, RoleType.FREELANCER);

    return { message: 'User role changed to FREELANCER' };
    }
    
    
  }
}
