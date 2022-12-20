import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { TailorEntities } from '@components/users/entities/tailor.entities';
import { MaterialsEntities } from '@components/seeder-tools/entities/materials.entities';

@Table({ tableName: 'tailor_material' })
export class TailorMaterialsEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => TailorEntities)
  @Column({ type: DataType.UUID })
  tailorId: string;

  @ForeignKey(() => MaterialsEntities)
  @Column
  materialId: number;

  @Column
  percentage: number;

  @BelongsTo(() => TailorEntities, 'tailorId')
  tailor: TailorEntities;

  @BelongsTo(() => MaterialsEntities, 'materialId')
  material: MaterialsEntities;
}
