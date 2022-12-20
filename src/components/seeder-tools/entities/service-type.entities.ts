import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'services_type', timestamps: false })
export class ServicesTypeEntities extends Model {
  @Column
  name: string;
}
