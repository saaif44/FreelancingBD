import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from '.prisma/client';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signup(signupDto: SignupDto): Promise<User>;
    signin(signinDto: SigninDto): Promise<{
        accessToken: string;
    }>;
    validateUser(userId: number): Promise<User>;
    verifyPassword(password: string, userId: number): Promise<boolean>;
}
