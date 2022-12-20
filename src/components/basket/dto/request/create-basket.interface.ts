import { Optional } from 'sequelize/types';

export interface CreateBasketInterface extends Optional<any, string> {
  tailorId: string;
  customerId: string;
}
