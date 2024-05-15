import { Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';


@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService){}

    
    @Post("/login")
    @UseGuards(AuthGuard('local'))
    async login(@Req() req:Request){
        return await this.authService.login(req.body);
    }
    @Post("/signup")
    async signup(@Req() req:Request){
        return await this.authService.signup(req.body);
    }

}
