import { Module } from '@nestjs/common';
import { JobService } from './jobservice.service';
import { JobController } from './jobservice.controller';


@Module({
  controllers: [JobController],
  providers: [JobService]
})
export class JobserviceModule {}
