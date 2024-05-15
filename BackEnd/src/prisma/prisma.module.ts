// prismaModule.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@prisma/client';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
