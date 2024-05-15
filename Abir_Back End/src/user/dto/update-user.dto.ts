import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UpdateUserDto {

    @IsString()@IsOptional()
    name? : string;

    @IsEmail()@IsOptional()
    email?: string;

   

}
