// dashboard/dashboard.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleType } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserRole(userId: number): Promise<RoleType> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    return user.role;
  }

  async getJobs() {
    return this.prisma.job.findMany();
  }

  async getServices() {
    return this.prisma.service.findMany();
  }

  async changeUserRole(userId: number, newRole: RoleType) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
  }
}
