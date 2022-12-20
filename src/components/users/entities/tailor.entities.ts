import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { UserEntities } from '@components/users/entities/user.entities';
import { TailorMaterialsEntities } from '@components/users/entities/tailor-materials.entities';
import { TailorServiceEntities } from '@components/users/entities/tailor-service.entities';
import { ReviewEntities } from '@components/review/entities/review.entities';

@Table({ tableName: 'tailor' })
export class TailorEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => UserEntities)
  userId: string;

  @Column
  businessName: string;

  @Column
  address: string;

  @Default(true)
  @Column
  status: boolean;

  @Column
  paymentPlan: string;

  @BelongsTo(() => UserEntities, 'userId')
  user: UserEntities;

  @HasMany(() => TailorMaterialsEntities)
  tailorMaterials: TailorMaterialsEntities[];

  @HasMany(() => TailorServiceEntities)
  tailorServices: TailorServiceEntities[];

  @HasMany(() => ReviewEntities)
  reviews: ReviewEntities[];
}
