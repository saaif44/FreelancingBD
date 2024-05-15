import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PrivacySetting {
    @Column()
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    active:boolean;

    @Column()
    vacation:boolean;

    @Column()
    rating: boolean;

    @Column()
    pendingWork: boolean;
}
