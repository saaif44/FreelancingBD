import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PrivacySettingsService } from './privacy-settings.service';
import { CreatePrivacySettingDto } from './dto/create-privacy-setting.dto';
import { UpdatePrivacySettingDto } from './dto/update-privacy-setting.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('privacy-settings')

export class PrivacySettingsController {
  constructor(private readonly privacySettingsService: PrivacySettingsService) {}

  @Post()
  create(@Body() createPrivacySettingDto: CreatePrivacySettingDto) {
    return this.privacySettingsService.create(createPrivacySettingDto);
  }

  @Get()
  findAll() {
    return this.privacySettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.privacySettingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrivacySettingDto: UpdatePrivacySettingDto) {
    return this.privacySettingsService.update(+id, updatePrivacySettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.privacySettingsService.remove(+id);
  }
}
