import { Controller, Post, Body, Put, Param, Delete, Get ,UseGuards, Req, BadRequestException , HttpException} from '@nestjs/common';
import { JobService } from './jobservice.service';
import { CreateJobDto, CreateServiceDto, CreateBidDto, UpdateBidDto, ServiceFetchDto,JobDFetchto } from './dto/jobservice.dto';
import { Interface } from 'readline';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { Bid } from '@prisma/client';


interface DecodedToken {
    userId: number;
} 

@Controller('jobservice')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post('createjob')
  async createJob(@Body() createJobDto: CreateJobDto) {
    return this.jobService.createJob(createJobDto);
  }

  @Post('createservice')
  async createService(@Body() createServiceDto: CreateServiceDto) {
    
    return this.jobService.createService(createServiceDto);
  }

  @Post('createbid')
  @UseGuards(JwtAuthGuard)
  async createBid(@Body() createBidDto: CreateBidDto, @Req() request: Request) {
    try {
      return await this.jobService.createBid(createBidDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new HttpException('Internal server error', 500);
    }
  }

//   @Put('bids/:id')
//   async updateBid(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
//     return this.jobService.updateBid(+id, updateBidDto);
//   }

//   @Delete('bids/:id') // Endpoint for deleting a bid
//   async deleteBid(@Param('id') id: string) {
//     return this.jobService.deleteBid(+id);
//   }

    @Get('services')
    async getAllServices(): Promise<ServiceFetchDto[]> {
      return this.jobService.getAllServices();
    }


    @Get('jobs')
    async getAllJobs(): Promise<JobDFetchto[]> {
      return this.jobService.getAllJobs();
    }

     @Get('bids')
     async getAllBids(): Promise<Bid[]> {
      return this.jobService.getAllBids();
    }

}
