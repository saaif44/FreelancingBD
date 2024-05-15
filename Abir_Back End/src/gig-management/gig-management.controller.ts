import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GigManagementService } from './gig-management.service';
import { CreateGigManagementDto } from './dto/create-gig-management.dto';
import { UpdateGigManagementDto } from './dto/update-gig-management.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('gig-management')
@UseGuards(AuthGuard('jwt'))
export class GigManagementController {
  constructor(private readonly gigManagementService: GigManagementService) {}

  @Post()
  create(@Body() createGigManagementDto: CreateGigManagementDto) {
    return this.gigManagementService.create(createGigManagementDto);
  }

  @Get()
  findAll() {
    //return "Iamall";
    return this.gigManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gigManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGigManagementDto: UpdateGigManagementDto) {
    return this.gigManagementService.update(+id, updateGigManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gigManagementService.remove(+id);
  }
}
