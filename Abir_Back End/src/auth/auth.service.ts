import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService,
    ){}

    async validateUser(email:string, password:string){
        const user = await this.userService.findByEmail(email);
        if(user){
            if(user.password === password){
                return user;
            }
        }
        return null;
    }

    async login(userr:any){
        const payload = {email : userr.email, sub : userr.id};
        const user = await this.userService.findOne(userr.email);
        const tocken =  this.jwtService.sign(payload);
        return  {
           user, tocken 
        }
    }
    async signup(userr:any){
        const user = await this.userService.create(userr);
        return user;
    }

}
