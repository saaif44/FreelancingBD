import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobEntity } from './entities/job.entity';
@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  async create(
    createJobDto: CreateJobDto,
    currentUser: UserEntity,
  ): Promise<JobEntity> {
    const job = this.jobRepository.create(createJobDto);
    job.addedBy = currentUser;
    return await this.jobRepository.save(job);
  }

  async findAll(): Promise<JobEntity[]> {
    return await this.jobRepository.find();
  }

  async findOne(id: number): Promise<JobEntity> {
    return await this.jobRepository.findOne({ where: { id } });
  }

  async update(
    id: number,

    fields: Partial<UpdateJobDto>,
  ): Promise<JobEntity> {
    const job = await this.findOne(id);
    if (!job) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    Object.assign(job, fields);

    return await this.jobRepository.save(job);
  }
  async remove(id: number): Promise<void> {
    const result = await this.jobRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
  }
}
