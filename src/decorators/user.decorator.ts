import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IReqUser } from '@decorators/auth.user.data';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IReqUser => {
    const request = ctx.switchToHttp().getRequest();

    return { ...request.user, ...request.userRedisData };
  },
);
