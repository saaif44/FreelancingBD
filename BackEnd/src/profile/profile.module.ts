import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET || 'jwt-secret',
    signOptions: { expiresIn: '1d' },
  })],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
