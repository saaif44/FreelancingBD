import { Module } from '@nestjs/common';
import { GigManagementService } from './gig-management.service';
import { GigManagementController } from './gig-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GigManagement } from './entities/gig-management.entity';


@Module({
  imports:[TypeOrmModule.forFeature([GigManagement])],
  controllers: [GigManagementController],
  providers: [GigManagementService],
})
export class GigManagementModule {}
