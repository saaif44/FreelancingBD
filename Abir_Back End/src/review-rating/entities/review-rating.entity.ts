import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReviewRating {
    @Column()
    @PrimaryGeneratedColumn()
    ReviewId:number;

    @Column()
    @IsNumber()
    FromUser:number;

    @Column()
    @IsNumber()
    ToUser:number;

    @Column()
    @IsNotEmpty()
    Title:string;

    @Column()
    @IsNotEmpty()
    Description:string;


    @Column()
    @IsNotEmpty()
    @IsNumber()
    Rating: number;

}
