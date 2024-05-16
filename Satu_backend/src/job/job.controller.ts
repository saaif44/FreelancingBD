import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobEntity } from './entities/job.entity';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  //@UseGuards(AuthorizeGuard) // Guarding the endpoint with JWT authentication
  async create(
    @Body() createJobDto: CreateJobDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<JobEntity> {
    return await this.jobService.create(createJobDto, currentUser);
  }

  @Get()
  async findAll(): Promise<JobEntity[]> {
    return await this.jobService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<JobEntity> {
    return await this.jobService.findOne(id);
  }

  @Patch(':id')
  //@UseGuards(AuthorizeGuard) // Guarding the endpoint with JWT authentication
  async update(
    @Param('id') id: number,
    @Body() updateJobDto: UpdateJobDto,
  ): Promise<JobEntity> {
    return await this.jobService.update(+id, updateJobDto);
  }

  @Delete(':id')
  //@UseGuards(AuthorizeGuard) // Guarding the endpoint with JWT authentication
  async remove(@Param('id') id: number): Promise<void> {
    await this.jobService.remove(id);
  }
}
