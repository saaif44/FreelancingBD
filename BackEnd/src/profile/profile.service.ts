import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto , EditProfileDto, UserDataDto,  updateUserDto } from './dto/profile.dto';
import { RoleType } from '@prisma/client';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) {}

    async createProfile(userId: number, data: CreateProfileDto) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                username: data.name,
                role: data.role as RoleType,
                language_known: data.language_known,
                nationality: data.nationality,
                address: data.address,
                phone_number: data.phone_number,
                // Add other fields
            },
            include: {
                FreelancerProfile: true,
                ClientProfile: true,
            },
        });
    }

    async editProfile(userId: number, id: number, data: EditProfileDto) {
        return this.prisma.user.update({
            where: { id: id }, // Use the id parameter to identify the user to update
            data: {
                username: data.name,
                password: data.password,
                language_known: data.language_known,
                nationality: data.nationality,
                address: data.address,
                phone_number: data.phone_number,
                email: data.email,
            },
            include: {
                FreelancerProfile: true,
                ClientProfile: true,
            },
        });
    }

    async getUserData(userId: number, data: UserDataDto) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                username: true,
                role: true,
                language_known: true,
                nationality: true,
                address: true,
                phone_number: true,
                balance: true,
                FreelancerProfile: true,
                ClientProfile: true,
                email: true,
                password:true,
                id:true,
            },
        });
    }

    async getAllUserData() {
        return this.prisma.user.findMany({
            // Specify any conditions or include related data as needed
        });
    }


    //nwwwwwwwwwwww


    async deleteUser(id: number): Promise<boolean> {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      await this.prisma.user.delete({
        where: { id },
      });
      return true; // User deleted successfully
    }
  
    async updateUser(userId:number, id: number, data: updateUserDto): Promise<boolean> {
      try {
        await this.prisma.user.update({
          where: { id },
          data,
        });
        return true; // User updated successfully
      } catch (error) {
        console.error('Error updating user:', error);
        return false; // Updating user failed
      }
    }
    

}

