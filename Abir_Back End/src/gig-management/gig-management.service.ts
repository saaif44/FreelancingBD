import { Injectable } from '@nestjs/common';
import { CreateGigManagementDto } from './dto/create-gig-management.dto';
import { UpdateGigManagementDto } from './dto/update-gig-management.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GigManagement } from './entities/gig-management.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GigManagementService {

  constructor(
    @InjectRepository(GigManagement)
    private gigRepository: Repository<GigManagement>
  ){}

  async create(createGigManagementDto: CreateGigManagementDto) {
    //const data = await this.userRepository.create(createUserDto); 
    return this.gigRepository.save(createGigManagementDto);
  }

  async findAll() {
    return await this.gigRepository.find();
  }

  async findOne(id: number) {
    return await this.gigRepository.findOne({where:{GigId:id}});
  }

  async update(id: number, gig: Partial<GigManagement>): Promise<GigManagement> {
   
    const gig2 = this.gigRepository.findOne({ where: { GigId:id } });
    if(gig2){
       await this.gigRepository.update(id, gig);
       return this.gigRepository.findOne({ where: { GigId:id } });
    }
    return null;
  }

  async remove(id: number) {
    return await this.gigRepository.delete(id);
  }
}
