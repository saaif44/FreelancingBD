// dashboard/dashboard.module.ts

import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller'; // Update import
import { DashboardService } from './dashboard.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule,JwtModule.register({
    secret: process.env.JWT_SECRET || 'jwt-secret',
    signOptions: { expiresIn: '1d' }
  }), ],
  controllers: [DashboardController], // Update controller reference
  providers: [DashboardService],
})
export class DashboardModule {}
