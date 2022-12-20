import { Column, Default, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'credentials' })
export class CredentialsEntities extends Model {
  @Default(null)
  @Column
  refreshToken?: string;

  @Column
  password: string;
}
