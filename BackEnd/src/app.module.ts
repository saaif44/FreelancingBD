// app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { JwtModule } from '@nestjs/jwt';
import { MessageModule } from './message/message.module';
import { multerConfig } from './config/multer.config';
import { FileController } from './file/file.controller';
 import { FileModule } from './file/file.module';
import { FileUploadService } from './file/file-upload.service';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { MulterModule } from '@nestjs/platform-express';
import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionModule } from './transaction/transaction.module';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppGateway } from '../src/app.gateway';
import { JobserviceModule } from './jobservice/jobservice.module';

@Module({
  imports: [ FileModule, AuthModule, PrismaModule, UsersModule, ProfileModule, JwtModule.register({
    secret: process.env.JWT_SECRET || 'jwt-secret',
    signOptions: { expiresIn: '1d' },
  }), MessageModule, MulterModule.register(multerConfig), TransactionModule, DashboardModule, JobserviceModule, ],
  controllers: [ FileController, TransactionController, DashboardController, ],
  providers: [ AppGateway, FileUploadService, TransactionService, DashboardService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*');
  }
}
