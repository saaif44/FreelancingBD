import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    //const data = await this.userRepository.create(createUserDto); 

    const user = await this.findByEmail(createUserDto.email);
    if(user)  throw new NotFoundException("User Already Exits");
    const pass = await this.userRepository.findOne({ where: { password: createUserDto.password } });
    if(pass) throw new NotFoundException("Password Already in Use");
    return this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(data: any) {
    const val = parseInt(data);
    if (Number.isInteger(val)) {
      return await this.userRepository.findOne({
        where: { id: parseInt(data) },
      });
    }
    const user = await this.userRepository.findOne({ where: { email: data } });
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found!');
  }


  async update(id: number, user: Partial<User>): Promise<User> {
   
    const user2 = this.userRepository.findOne({ where: { id } });
    if(user2){
       await this.userRepository.update(id, user);
       return user2;
    }
    return null;
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async findByEmail(email:string){
    return  await this.userRepository.findOne({where:{email}});
  }
}
