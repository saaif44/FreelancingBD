import { IsNotEmpty, IsString } from 'class-validator';
import { UserSignInDto } from './signin-user.dto';

export class UserSignUpDto extends UserSignInDto {
  @IsNotEmpty({ message: 'Name can not be empty!' })
  @IsString({ message: 'Name should be string.' })
  name: string;
}
