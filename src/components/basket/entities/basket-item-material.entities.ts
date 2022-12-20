import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { BasketItemEntities } from '@components/basket/entities/basket-item.entities';
import { MaterialsEntities } from '@components/seeder-tools/entities/materials.entities';

@Table({ tableName: 'basket_item_material' })
export class BasketItemMaterialEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => BasketItemEntities)
  @Column({ type: DataType.UUID })
  basketItemId: string;

  @ForeignKey(() => MaterialsEntities)
  @Column
  materialId: number;
}
