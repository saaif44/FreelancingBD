import { Injectable , BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BidFetchto,CreateJobDto, CreateServiceDto, CreateBidDto, UpdateBidDto, JobDFetchto, ServiceFetchDto } from './dto/jobservice.dto';
import { FreelancerProfile, Job, Bid, Service, Prisma } from '@prisma/client';



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
    const { description, attachment, offer_time, offer_rate, freelancer_profile_id, jobId } = createBidDto;
    try {
      return await this.prisma.bid.create({
        data: {
          description,
          attachment,
          offer_time,
          offer_rate,
          FreelancerProfile: { connect: { id: freelancer_profile_id } },
          Job: { connect: { id: jobId } },
        },
      });
    } catch (error) {
      if (error.code === 'P2002') { // Prisma unique constraint error code
        throw new BadRequestException('You have already bidded on this job.');
      }
      throw error;
    }
  }



  async getAllJobs(): Promise<JobDFetchto[]> {
    const jobs = await this.prisma.job.findMany({
      select: {
        title: true,
        description: true,
        budget: true,
        deadline: true,
        is_payment_verified: true,
        is_job_completed: true,
        created_at: true,
        updated_at: true,
        client_profile_id: true,
        freelancer_profile_id: true,
      },
    });
    return jobs;
  }


  async getAllServices(): Promise<ServiceFetchDto[]> {
    const services = await this.prisma.service.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        standard_offer: true,
        premium_offer: true,
        butter_offer: true,
        freelancer_profile_id: true,
      },
    });
    return services;
  }


  async getAllBids(): Promise<Bid[]> {
    return this.prisma.bid.findMany();
  }

}
