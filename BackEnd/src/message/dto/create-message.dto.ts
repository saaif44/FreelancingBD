import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  
  @IsNotEmpty()
  @IsInt()
  recipientId: number;


  @IsNotEmpty()
  @IsString()
  userId: string;

  
}
