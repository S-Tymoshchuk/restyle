import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { BasketItemEntities } from '@components/basket/entities/basket-item.entities';
import { ServicesEntities } from '@components/seeder-tools/entities/service.entities';
import { ClothingItemsEntities } from '@components/seeder-tools/entities/clothing-items.entities';

@Table({ tableName: 'basket_item_service' })
export class BasketItemServiceEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => BasketItemEntities)
  @Column({ type: DataType.UUID })
  basketItemId: string;

  @ForeignKey(() => ServicesEntities)
  @Column
  serviceId: number;

  @BelongsTo(() => ServicesEntities, 'serviceId')
  service: ClothingItemsEntities;
}
