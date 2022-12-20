import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReviewEntities } from '@components/review/entities/review.entities';
import { CreateReviewRequest } from '@components/review/dto/request/create-review-request';
import { ReviewOptionsEntities } from '@components/review/entities/review-options.entities';
import { loggerMessages } from '@constants/logger.messages';

@Injectable()
export class ReviewRepository {
  private readonly logger = new Logger(ReviewRepository.name);

  constructor(
    @InjectModel(ReviewEntities)
    private readonly reviewModel: typeof ReviewEntities,
  ) {}

  createReview(body: CreateReviewRequest): Promise<ReviewEntities> {
    const reviewOptions = body.reviewOptions.map((el) => ({
      reviewAnswerId: el,
    }));

    this.logger.log(loggerMessages.create('review answers'), reviewOptions);

    return this.reviewModel.create(
      { ...body, reviewOptions },
      { include: ReviewOptionsEntities },
    );
  }
}
