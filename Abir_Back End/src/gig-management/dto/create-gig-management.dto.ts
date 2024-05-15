import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGigManagementDto {
   
    @IsNotEmpty() @IsNumber()
    FreeLancerId:number;
    
    @IsNotEmpty()
    GigTitle:string;
   
    @IsNotEmpty()
    Description:string;

    @IsNotEmpty()
    Price: number;

    @IsNotEmpty()
    Tag: string;
}
