import { Injectable } from '@nestjs/common';
import { CreateReviewRatingDto } from './dto/create-review-rating.dto';
import { UpdateReviewRatingDto } from './dto/update-review-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRating } from './entities/review-rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewRatingService {

  constructor(
    @InjectRepository(ReviewRating)
    private reviewRatingRepository: Repository<ReviewRating>
  ){}

  async create(createReviewRatingDto: CreateReviewRatingDto) {
    return this.reviewRatingRepository.save(createReviewRatingDto);
  }

  async findAll() {
    return await this.reviewRatingRepository.find();
  }

  async findOne(id: number) {
    return await this.reviewRatingRepository.findOne({where:{FromUser:id}});
  }

  async update(id: number, reviewRating: Partial<ReviewRating>): Promise<ReviewRating> {
   
    const user2 = this.reviewRatingRepository.findOne({ where: { ReviewId:id } });
    if(user2){
       await this.reviewRatingRepository.update(id, reviewRating);
       return this.reviewRatingRepository.findOne({ where: { ReviewId:id } });
    }
    return null;
  }

  async remove(id: number) {
    return await this.reviewRatingRepository.delete( id );
  }
}
