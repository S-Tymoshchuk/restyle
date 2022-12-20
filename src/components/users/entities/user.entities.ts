import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRoles } from '../dto/user.dto';
import { CredentialsEntities } from '@components/authentication/entities/credentials.entities';
import { UUIDV4 } from 'sequelize';
import { UserImagesEntities } from '@components/users/entities/user-images.entities';
import { TailorEntities } from '@components/users/entities/tailor.entities';

@Table({ tableName: 'user', paranoid: true })
export class UserEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @AllowNull(false)
  @Column({ unique: true })
  email: string;

  @Default(UserRoles.customer)
  @Column
  role: UserRoles;

  @Default(false)
  @Column
  isEmailConfirmed: boolean;

  @Column
  phone: string;

  @Column
  deletedAt: Date;

  @ForeignKey(() => CredentialsEntities)
  @Column
  credentialsId: number;

  @ForeignKey(() => TailorEntities)
  @Column({ type: DataType.UUID, allowNull: true })
  tailorId: string;

  @BelongsTo(() => TailorEntities, 'tailorId')
  tailor: TailorEntities;

  @BelongsTo(() => CredentialsEntities, 'credentialsId')
  credentials: CredentialsEntities;

  @HasMany(() => UserImagesEntities)
  images: UserImagesEntities[];
}
