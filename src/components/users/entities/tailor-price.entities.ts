import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { ClothingItemsEntities } from '@components/seeder-tools/entities/clothing-items.entities';
import { TailorServiceEntities } from '@components/users/entities/tailor-service.entities';
import { ServicesEntities } from '@components/seeder-tools/entities/service.entities';

@Table({ tableName: 'tailor_price' })
export class TailorPriceEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => TailorServiceEntities)
  @Column({ type: DataType.UUID })
  tailorServiceId: number;

  @ForeignKey(() => ClothingItemsEntities)
  @Column
  clothingItemId: number;

  @ForeignKey(() => ServicesEntities)
  @Column
  serviceId: number;

  @Column
  price: number;

  @BelongsTo(() => TailorServiceEntities, 'tailorServiceId')
  tailorService: TailorServiceEntities;

  @BelongsTo(() => ServicesEntities, 'serviceId')
  service: ServicesEntities;

  @BelongsTo(() => ClothingItemsEntities, 'clothingItemId')
  clothingItem: ClothingItemsEntities;
}
