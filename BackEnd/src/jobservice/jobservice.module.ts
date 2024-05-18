import { Module } from '@nestjs/common';
import { JobService } from './jobservice.service';
import { JobController } from './jobservice.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from'src/users/users.module';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: process.env.JWT_SECRET || 'jwt-secret',
    signOptions: { expiresIn: '1d' }
  }),],
  controllers: [JobController],
  providers: [JobService]
})
export class JobserviceModule {}
