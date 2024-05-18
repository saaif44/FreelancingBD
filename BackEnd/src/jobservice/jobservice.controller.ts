import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { JobService } from './jobservice.service';
import { CreateJobDto, CreateServiceDto, CreateBidDto, UpdateBidDto } from './dto/jobservice.dto';

@Controller('jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post()
  async createJob(@Body() createJobDto: CreateJobDto) {
    return this.jobService.createJob(createJobDto);
  }
}

@Controller('services')
export class ServiceController {
  constructor(private jobService: JobService) {}

  @Post()
  async createService(@Body() createServiceDto: CreateServiceDto) {
    return this.jobService.createService(createServiceDto);
  }

  @Post('bids') 
  async createBid(@Body() createBidDto: CreateBidDto) {
    return this.jobService.createBid(createBidDto);
  }

  @Put('bids/:id')
  async updateBid(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
    return this.jobService.updateBid(+id, updateBidDto);
  }

//   @Delete('bids/:id') // Endpoint for deleting a bid
//   async deleteBid(@Param('id') id: string) {
//     return this.jobService.deleteBid(+id);
//   }
}
