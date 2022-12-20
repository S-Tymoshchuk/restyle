import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { TailorEntities } from '@components/users/entities/tailor.entities';
import { ServicesEntities } from '@components/seeder-tools/entities/service.entities';
import { ReviewOptionsEntities } from '@components/review/entities/review-options.entities';
import { ReviewStarEnum } from '@components/review/enums/review-star-enum';

@Table({ tableName: 'review' })
export class ReviewEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => TailorEntities)
  @Column({ type: DataType.UUID })
  tailorId: string;

  @ForeignKey(() => ServicesEntities)
  @Column
  serviceId: number;

  @Column
  name: string;

  @Column
  titleReview: string;

  @Column
  stars: ReviewStarEnum;

  @Column
  feedback: string;

  @HasMany(() => ReviewOptionsEntities)
  reviewOptions: ReviewOptionsEntities[];
}
