import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  url: string;
//will add others later
}
