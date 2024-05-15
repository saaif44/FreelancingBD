import { PartialType } from '@nestjs/mapped-types';
import { CreatePrivacySettingDto } from './create-privacy-setting.dto';

export class UpdatePrivacySettingDto extends PartialType(CreatePrivacySettingDto) {}
