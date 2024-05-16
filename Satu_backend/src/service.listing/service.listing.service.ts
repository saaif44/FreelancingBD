import { Injectable } from '@nestjs/common';
import { CreateServiceListingDto } from './dto/create-service.listing.dto';
import { UpdateServiceListingDto } from './dto/update-service.listing.dto';

@Injectable()
export class ServiceListingService {
  create(createServiceListingDto: CreateServiceListingDto) {
    return 'This action adds a new serviceListing';
  }

  findAll() {
    return `This action returns all serviceListing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceListing`;
  }

  update(id: number, updateServiceListingDto: UpdateServiceListingDto) {
    return `This action updates a #${id} serviceListing`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceListing`;
  }
}
