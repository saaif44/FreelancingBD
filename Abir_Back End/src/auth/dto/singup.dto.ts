import { IsNotEmpty, IsStrongPassword } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SignupDto {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    email: string;

    @Column() 
    @IsNotEmpty()
    password: string;
    
    @Column()
    @IsNotEmpty()
    type : string

    // @Column()
    // dueDate: string;

    // @Column()   
    // priority: string;

}
