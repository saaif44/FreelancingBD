import { Module } from '@nestjs/common';
import { PrivacySettingsService } from './privacy-settings.service';
import { PrivacySettingsController } from './privacy-settings.controller';
import { PrivacySetting } from './entities/privacy-setting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([PrivacySetting])],
  controllers: [PrivacySettingsController],
  providers: [PrivacySettingsService],
})
export class PrivacySettingsModule {}
