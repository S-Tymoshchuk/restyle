import { Optional } from 'sequelize/types';

export interface ReviewsInterface extends Optional<any, string> {
  name: string;
}
