import { PartialType } from '@nestjs/mapped-types';
import { CreateGigManagementDto } from './create-gig-management.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateGigManagementDto extends PartialType(CreateGigManagementDto) {
    
    @IsNotEmpty()
    GigTitle:string;
   
    @IsNotEmpty()
    Description:string;

    @IsNotEmpty()
    Price: number;

    @IsNotEmpty()
    Tag: string;
}
