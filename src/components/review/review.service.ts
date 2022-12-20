import { Injectable } from '@nestjs/common';
import { CreateReviewRequest } from '@components/review/dto/request/create-review-request';
import { ReviewRepository } from '@components/review/review.repository';
import { ReviewEntities } from '@components/review/entities/review.entities';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  createReview(body: CreateReviewRequest): Promise<ReviewEntities> {
    return this.reviewRepository.createReview(body);
  }
}
