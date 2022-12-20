import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { UserImagesTypeEnum } from '@components/users/enums/user-images-type.enum';
import { UserEntities } from '@components/users/entities/user.entities';

@Table({ tableName: 'user_images' })
export class UserImagesEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => UserEntities)
  @Column({ type: DataType.UUID })
  userId: string;

  @Column
  type: UserImagesTypeEnum;

  @Column
  link: string;

  @BelongsTo(() => UserEntities, 'userId')
  user: UserEntities;
}
