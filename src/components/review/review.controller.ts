import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { REVIEW_TAG } from '@docs/tags';
import { REVIEW_PATH } from '@docs/path';
import { ReviewService } from '@components/review/review.service';
import { CreateReviewRequest } from '@components/review/dto/request/create-review-request';
import { loggerMessages } from '@constants/logger.messages';

@ApiTags(REVIEW_TAG)
@Controller(REVIEW_PATH)
export class ReviewController {
  private readonly logger = new Logger(ReviewController.name);

  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  createReview(@Body() body: CreateReviewRequest) {
    this.logger.log(loggerMessages.create('review'), body);
    return this.reviewService.createReview(body);
  }
}
