import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'materials', timestamps: false })
export class MaterialsEntities extends Model {
  @Column
  name: string;
}
