import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewRatingDto } from './create-review-rating.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateReviewRatingDto extends PartialType(CreateReviewRatingDto) {
       
    @IsNotEmpty()
    @IsString()
    Title:string;

    @IsNotEmpty()
    @IsString()
    Description:string;
    
    @IsNotEmpty()
    @IsNumber()
    Rating: number;
}
