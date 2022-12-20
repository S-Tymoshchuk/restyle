import { Optional } from 'sequelize/types';

export interface SaveImagesForDbRequest extends Optional<any, string> {
  link: string;
  type: string;
  userId: string;
}
