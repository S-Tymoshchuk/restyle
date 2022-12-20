import { Optional } from 'sequelize';

export interface ServicesTypeInterface extends Optional<any, string> {
  name: string;
}
