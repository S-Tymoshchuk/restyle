import { Column, Model, Table } from 'sequelize-typescript';
import { ServicesTypeEnum } from '@components/seeder-tools/enums/services-type-enum';

@Table({ tableName: 'services', timestamps: false })
export class ServicesEntities extends Model {
  @Column
  name: string;

  @Column
  type: ServicesTypeEnum;
}
