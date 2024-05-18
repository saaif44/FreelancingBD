// auth.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User, FreelancerProfile , ClientProfile } from '.prisma/client';
import { Prisma } from '.prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(signupDto: SignupDto): Promise<User> {
    //map properties frm SignupDto to UserCreateInput
    const userData = {
      username: signupDto.username,
      email: signupDto.email,
      password: signupDto.password,
      role: signupDto.role, 
      balance: signupDto.balance,
      language_known: signupDto.language_known, 
      nationality: signupDto.nationality,
      address: signupDto.address, 
      phone_number: signupDto.phone_number, 
      nid_number: signupDto.nid_number, 
      
    } as Prisma.UserCreateInput; 

    

    //crt new user to prisma
    const user = await this.prisma.user.create({
      data: userData,
    });

    await this.createFreelancerProfile(user.id);
    await this.createClientProfile(user.id);

    return user;
  }

  async signin(signinDto: SigninDto): Promise<{ accessToken: string }> {
    const { email, password } = signinDto;

    //lets find the user by email
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    //validate password
    if (user.password !== password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    //generate JWT token
    const payload = { userId: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUser(userId: number): Promise<User> {
    //find user by ID
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return user;
  }


  async verifyPassword(password: string, userId: number): Promise<boolean> {
    // Find the user by ID
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Validate password
    return user.password === password;
  }

  private async createFreelancerProfile(userId: number): Promise<void> {
    // Create FreelancerProfile for the user
    await this.prisma.freelancerProfile.create({
      data: {
        userId,
        // Set other properties of FreelancerProfile as needed
      },
    });
  }


  private async createClientProfile(userId: number): Promise<void> {
    // Create FreelancerProfile for the user
    await this.prisma.clientProfile.create({
      data: {
        userId,
        // Set other properties of FreelancerProfile as needed
      },
    });
  }


}
