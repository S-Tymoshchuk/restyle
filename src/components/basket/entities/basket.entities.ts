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
import { UserEntities } from '@components/users/entities/user.entities';
import { TailorEntities } from '@components/users/entities/tailor.entities';
import { BasketItemEntities } from '@components/basket/entities/basket-item.entities';

@Table({ tableName: 'basket' })
export class BasketEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => UserEntities)
  @Column({ type: DataType.UUID })
  customerId: string;

  @ForeignKey(() => TailorEntities)
  @Column({ type: DataType.UUID })
  tailorId: string;

  @BelongsTo(() => UserEntities, 'customerId')
  user: UserEntities;

  @BelongsTo(() => TailorEntities, 'tailorId')
  tailor: TailorEntities;

  @HasMany(() => BasketItemEntities)
  basketItems: BasketItemEntities[];
}
