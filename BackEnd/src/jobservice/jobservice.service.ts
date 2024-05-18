import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto, CreateServiceDto, CreateBidDto, UpdateBidDto } from './dto/jobservice.dto';




@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async createJob(createJobDto: CreateJobDto) {
    return this.prisma.job.create({
      data: createJobDto,
    });
  }

  async createService(createServiceDto: CreateServiceDto) {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  async createBid(createBidDto: CreateBidDto) {
    return this.prisma.bid.create({
      data: createBidDto,
    });
  }

  async updateBid(id: number, updateBidDto: UpdateBidDto) {
    return this.prisma.bid.update({
      where: { id },
      data: updateBidDto,
    });
  }

}
