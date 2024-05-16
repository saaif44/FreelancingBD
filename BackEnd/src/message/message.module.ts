//messagemodule.ts
import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [ JwtModule.register({
    secret: process.env.JWT_SECRET || 'jwt-secret',
    signOptions: { expiresIn: '1d' },
  }) ,PrismaModule],
  controllers: [MessageController],
  providers: [AppGateway, MessageService, MessageGateway],
})
export class MessageModule {}

