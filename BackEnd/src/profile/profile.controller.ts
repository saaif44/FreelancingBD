// Import the DecodedToken interface
interface DecodedToken {
    userId: number;
    // other properties if present in the token payload
}

// profile.controller.ts
import { Controller, Post, Put,Get, Body, Param, UseGuards, Req, Patch, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { CreateProfileDto, EditProfileDto, UserDataDto , updateUserDto} from './dto/profile.dto';
import { Request } from 'express';
import { get, request } from 'http';
import { User } from '@prisma/client';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {

    constructor(private readonly profileService: ProfileService) { }

    @Post()
    async createProfile(@Body() createProfileDto: CreateProfileDto, @Req() request: Request) {
        const decodedToken = request.user as DecodedToken; // Cast to DecodedToken interface
        const userId = decodedToken.userId;
        return this.profileService.createProfile(userId, createProfileDto);
    }

    @Put(':id')
    editProfile(@Body() editProfileDto: EditProfileDto, @Param('id') id: number, @Req() request: Request) {
    const decodedToken = request.user as DecodedToken; // Cast to DecodedToken interface
    const userId = decodedToken.userId;
    return this.profileService.editProfile(userId, id, editProfileDto); //pass id instead of userId
   
}



//problem
    @Get('user')
    async getUserData(@Req() request: Request, UserDataDto: UserDataDto ) {
        const decodedToken = request.user as DecodedToken;
        const userId = decodedToken.userId;
        return this.profileService.getUserData(userId, UserDataDto);
    }


    @Get('allusers')
  async getAllUserData() {
    return this.profileService.getAllUserData();
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number, @Req() request: Request): Promise<void> {
    const decodedToken = request.user as DecodedToken;
    const userId = decodedToken.userId;
    await this.profileService.deleteUser(id);
  }

  @Patch(':id')
  async updateUser(@Body() updateUserDto: updateUserDto, @Param('id') id: number, @Req() request: Request) {
    const decodedToken = request.user as DecodedToken;
    const userId = decodedToken.userId;
    return this.profileService.updateUser(userId, id, updateUserDto);
  }
}
