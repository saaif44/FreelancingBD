import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty() 
    @IsString()
    @IsStrongPassword()
    password : string;

    @IsNotEmpty()
    @IsString()
    type : string;

}
