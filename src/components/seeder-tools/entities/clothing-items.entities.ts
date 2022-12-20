import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'clothing_items', timestamps: false })
export class ClothingItemsEntities extends Model {
  @Column
  name: string;
}
