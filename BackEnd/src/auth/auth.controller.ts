import { Controller, Post, Body, HttpException, HttpStatus , Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


interface DecodedToken {
  userId: number;
  // other properties if present in the token payload
}


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    try{
      return this.authService.signin(signinDto);
    }
    catch(error){
      if (error.status === HttpStatus.NOT_FOUND || error.status === HttpStatus.UNAUTHORIZED) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException('Failed to sign in. Please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('verify-password')
  @UseGuards(JwtAuthGuard)
  async verifyPassword(@Body() body: { password: string }, @Req() req: Request) {
    const decodedToken = req.user as DecodedToken;
    const userId = decodedToken.userId;

    try {
      const isValid = await this.authService.verifyPassword(body.password, userId);
      return { valid: isValid };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }


}
