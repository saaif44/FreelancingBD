import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;


  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  balance: number;


  @IsNotEmpty()
  @IsString()
  language_known: string;

  @IsNotEmpty()
  @IsString()
  nationality: string;

  address: string;


  
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  nid_number: string;
}
