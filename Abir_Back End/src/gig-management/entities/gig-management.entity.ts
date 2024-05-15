import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GigManagement {

    @Column()
    @PrimaryGeneratedColumn()
    GigId:number;

    @Column()@IsNotEmpty() @IsNumber()
    FreeLancerId:number;
    
    @Column()
    @IsNotEmpty()
    GigTitle:string;

    @Column()
    @IsNotEmpty()
    Description:string;


    @Column()
    @IsNotEmpty()
    Price: number;

    // @Column()
    // GigImage:ImageBitmap;

    @Column()
    @IsNotEmpty()
    Tag: string;
}
