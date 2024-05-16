import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty({ message: 'Title can not be empty!' })
  @IsString({ message: 'Title should be a string.' })
  title: string;
  @IsNotEmpty({ message: 'Description can not be empty!' })
  @IsString({ message: 'Description should be a string.' })
  description: string;
}
