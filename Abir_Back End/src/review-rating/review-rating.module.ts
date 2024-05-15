import { Module } from '@nestjs/common';
import { ReviewRatingService } from './review-rating.service';
import { ReviewRatingController } from './review-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRating } from './entities/review-rating.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ReviewRating])],
  controllers: [ReviewRatingController],
  providers: [ReviewRatingService],
})
export class ReviewRatingModule {}
