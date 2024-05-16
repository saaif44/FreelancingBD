import { Module } from '@nestjs/common';
import { ServiceListingService } from './service.listing.service';
import { ServiceListingController } from './service.listing.controller';

@Module({
  controllers: [ServiceListingController],
  providers: [ServiceListingService],
})
export class ServiceListingModule {}
