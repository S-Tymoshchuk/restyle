import { Module } from '@nestjs/common';
import { ReviewController } from '@components/review/review.controller';
import { ReviewService } from '@components/review/review.service';
import { ReviewRepository } from '@components/review/review.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewEntities } from '@components/review/entities/review.entities';

@Module({
  imports: [SequelizeModule.forFeature([ReviewEntities])],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
