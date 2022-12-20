import { Request } from 'express';
import { UserEntities } from '@components/users/entities/user.entities';

export interface RequestWithUser extends Request {
  user: UserEntities;
}
