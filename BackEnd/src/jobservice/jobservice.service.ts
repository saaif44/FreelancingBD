import { Injectable , BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto, CreateServiceDto, CreateBidDto, UpdateBidDto } from './dto/jobservice.dto';
import { FreelancerProfile, Job, Bid, Service } from '@prisma/client';



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
    const { description, attachment, offer_time, offer_rate, userId, jobId } = createBidDto;

    // Find the FreelancerProfile using userId
    const freelancerProfile = await this.prisma.freelancerProfile.findUnique({
      where: { userId: userId },
    });

    if (!freelancerProfile) {
      throw new Error('FreelancerProfile with the specified userId does not exist');
    }

    // Check if a bid already exists for this job from this freelancer
    const existingBid = await this.prisma.bid.findFirst({
      where: {
        freelancer_profile_id: freelancerProfile.userId,
        jobId: jobId,
      },
    });

    if (existingBid) {
      throw new BadRequestException('You have already made a bid for this job.');
    }

    // Create the bid
    return this.prisma.bid.create({
      data: {
        description,
        attachment,
        offer_time,
        offer_rate,
        FreelancerProfile: {
          connect: {
            id: freelancerProfile.id,
          },
        },
        job: {
          connect: {
            id: jobId,
          },
        },
      },
    });
  }
  

  async updateBid(id: number, updateBidDto: UpdateBidDto) {
    return this.prisma.bid.update({
      where: { id },
      data: updateBidDto,
    });
  }

}
