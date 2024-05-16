import { UserRole } from 'src/enums/enum';
import { JobEntity } from 'src/job/entities/job.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ select: false })
  password: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    array: true,
    default: [UserRole.SELLER],
  })
  roles: UserRole[];
  @OneToMany(() => JobEntity, (job) => job.addedBy)
  jobs: JobEntity[];
}
