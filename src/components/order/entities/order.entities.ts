import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { BasketEntities } from '@components/basket/entities/basket.entities';
import { StatusOrderEnum } from '@components/order/enums/status-order-enum';
import { CanceledOrderEnum } from '@components/order/enums/canceled-order-enum';

@Table({ tableName: 'order' })
export class OrderEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => BasketEntities)
  @Column({ type: DataType.UUID })
  basketId: string;

  @Default('pending')
  @Column
  paymentStatus: string;

  @Column
  deletedAt: Date;

  @Default(StatusOrderEnum.pending)
  @Column
  status: StatusOrderEnum;

  @Default(null)
  @Column
  canceled: CanceledOrderEnum;

  @BelongsTo(() => BasketEntities, 'basketId')
  basket: BasketEntities;
}
