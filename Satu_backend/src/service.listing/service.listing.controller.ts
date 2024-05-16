import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceListingService } from './service.listing.service';
import { CreateServiceListingDto } from './dto/create-service.listing.dto';
import { UpdateServiceListingDto } from './dto/update-service.listing.dto';

@Controller('service.listing')
export class ServiceListingController {
  constructor(private readonly serviceListingService: ServiceListingService) {}

  @Post()
  create(@Body() createServiceListingDto: CreateServiceListingDto) {
    return this.serviceListingService.create(createServiceListingDto);
  }

  @Get()
  findAll() {
    return this.serviceListingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceListingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceListingDto: UpdateServiceListingDto) {
    return this.serviceListingService.update(+id, updateServiceListingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceListingService.remove(+id);
  }
}
