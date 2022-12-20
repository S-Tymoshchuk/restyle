import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { TailorEntities } from '@components/users/entities/tailor.entities';
import { TailorPriceEntities } from '@components/users/entities/tailor-price.entities';
import { ServicesTypeEntities } from '@components/seeder-tools/entities/service-type.entities';

@Table({ tableName: 'tailor_service' })
export class TailorServiceEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => TailorEntities)
  @Column({ type: DataType.UUID })
  tailorId: string;

  @ForeignKey(() => ServicesTypeEntities)
  @Column
  serviceTypeId: number;

  @Column
  time: string;

  @BelongsTo(() => TailorEntities, 'tailorId')
  tailor: TailorEntities;

  @BelongsTo(() => ServicesTypeEntities, 'serviceTypeId')
  serviceType: ServicesTypeEntities;

  @HasMany(() => TailorPriceEntities, { onDelete: 'CASCADE', hooks: true })
  prices: TailorPriceEntities[];
}
