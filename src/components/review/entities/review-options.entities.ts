import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { ReviewAnswersEntities } from '@components/seeder-tools/entities/review-answers.entities';
import { ReviewEntities } from '@components/review/entities/review.entities';

@Table({ tableName: 'review_options', timestamps: false })
export class ReviewOptionsEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => ReviewEntities)
  @Column({ type: DataType.UUID })
  reviewId: string;

  @ForeignKey(() => ReviewAnswersEntities)
  @Column
  reviewAnswerId: number;

  @BelongsTo(() => ReviewAnswersEntities, 'reviewAnswerId')
  reviewAnswer: ReviewAnswersEntities;
}
