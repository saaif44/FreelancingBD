import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [ JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt-secret',
      signOptions: { expiresIn: '1d' },
    }) ,PrismaModule],
    controllers: [TransactionController],
    providers: [TransactionService],
  })
export class TransactionModule {}
