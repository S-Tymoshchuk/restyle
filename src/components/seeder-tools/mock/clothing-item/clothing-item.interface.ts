import { Optional } from 'sequelize';

export interface ClothingItemInterface extends Optional<any, string> {
  name: string;
}
