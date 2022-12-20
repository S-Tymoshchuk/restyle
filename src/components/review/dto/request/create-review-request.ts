import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { ReviewStarEnum } from '@components/review/enums/review-star-enum';

export class CreateReviewRequest {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  tailorId: string;

  @ApiProperty()
  @IsNumber()
  serviceId: number;

  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  reviewOptions: number[];

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  titleReview: string;

  @ApiProperty()
  @IsString()
  feedback: string;

  @ApiProperty()
  @IsEnum(ReviewStarEnum)
  stars: number;
}
