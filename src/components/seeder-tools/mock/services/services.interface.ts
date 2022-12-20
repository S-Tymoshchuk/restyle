import { ServicesTypeEnum } from '@components/seeder-tools/enums/services-type-enum';
import { Optional } from 'sequelize';

export interface ServicesInterface extends Optional<any, string> {
  name: string;
  type: ServicesTypeEnum;
}
