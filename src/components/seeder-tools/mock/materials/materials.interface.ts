import { Optional } from 'sequelize/types';

export interface MaterialsInterface extends Optional<any, string> {
  name: string;
}
