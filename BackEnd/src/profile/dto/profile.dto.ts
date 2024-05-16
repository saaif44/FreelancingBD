import { Decimal } from '@prisma/client/runtime/library';
import { IsString, IsNotEmpty, IsEmail, isInt, isNumber, isEmail, isString, isBoolean } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  role: string;

  @IsString()
  language_known: string;

  @IsString()
  nationality: string;

  @IsString()
  address: string;

  @IsString()
  @IsEmail()
  email: string; 

  @IsString()
  phone_number: string;

}

//EditProfileDto.ts

export class EditProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  language_known: string;

  @IsString()
  nationality: string;

  @IsString()
  address: string;

  @IsString()
  phone_number: string;

  @IsString()
  password: string;


  @IsEmail()
  email: string;

  

}


export class UserDataDto{
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  role: string;

  @IsString()
  language_known: string;

  @IsString()
  nationality: string;

  @IsString()
  address: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone_number: string;
  

  @IsString()
  balance: number;

  @IsString()
  password: string;

  @IsString()
  id: number;


}


export class updateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  language_known: string;

  @IsString()
  nationality: string;

  @IsString()
  address: string;

  @IsString()
  phone_number: string;

  @IsString()
  password: string;


  @IsEmail()
  email: string;

}
