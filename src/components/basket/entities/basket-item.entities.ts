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
import { BasketEntities } from '@components/basket/entities/basket.entities';
import { ClothingItemsEntities } from '@components/seeder-tools/entities/clothing-items.entities';
import { BasketItemMaterialEntities } from '@components/basket/entities/basket-item-material.entities';
import { BasketItemServiceEntities } from '@components/basket/entities/basket-item-service.entities';

@Table({ tableName: 'basket_item' })
export class BasketItemEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => BasketEntities)
  @Column({ type: DataType.UUID })
  basketId: string;

  @ForeignKey(() => ClothingItemsEntities)
  @Column
  clothingItemId: number;

  @HasMany(() => BasketItemMaterialEntities, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  itemsMaterial: BasketItemMaterialEntities;

  @HasMany(() => BasketItemServiceEntities, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  itemsService: BasketItemServiceEntities;

  @BelongsTo(() => ClothingItemsEntities, 'clothingItemId')
  clothingItem: ClothingItemsEntities;

  @BelongsTo(() => BasketEntities, 'basketId')
  basket: BasketEntities;
}
