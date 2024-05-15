import { Injectable } from '@nestjs/common';
import { CreatePrivacySettingDto } from './dto/create-privacy-setting.dto';
import { UpdatePrivacySettingDto } from './dto/update-privacy-setting.dto';

@Injectable()
export class PrivacySettingsService {
  create(createPrivacySettingDto: CreatePrivacySettingDto) {
    return 'This action adds a new privacySetting';
  }

  findAll() {
    return `This action returns all privacySettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} privacySetting`;
  }

  update(id: number, updatePrivacySettingDto: UpdatePrivacySettingDto) {
    return `This action updates a #${id} privacySetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} privacySetting`;
  }
}
