import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewRatingDto {
    
    
    ReviewId:number;

    
    @IsNumber()
    FromUser:number;

    
    @IsNumber()
    ToUser:number;

    
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
