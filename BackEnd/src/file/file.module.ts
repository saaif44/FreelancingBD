// file.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FileController } from './file.controller';
import { FileUploadService } from './file-upload.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt-secret',
      signOptions: { expiresIn: '1d' }
    }), PrismaModule,
  ],
  controllers: [FileController],
  providers: [FileUploadService, JwtAuthGuard],
})
export class FileModule {}
