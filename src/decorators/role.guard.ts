import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { RolesOptions } from '@decorators/auth-guard.options';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private moduleRef: ModuleRef,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roleCtxHandler = this.reflector.get<RolesOptions | number | number[]>(
      'roleGuardOptions',
      context.getHandler(),
    );
    const roleCtxClass = this.reflector.get<RolesOptions | number | number[]>(
      'roleGuardOptions',
      context.getClass(),
    );

    const roleGuard = roleCtxHandler || roleCtxClass;
    const { user, query, params } = context.switchToHttp().getRequest();

    if (!user) {
      return false;
    }

    if (!roleGuard) {
      return true;
    }

    let haveAccess: boolean;
    const userRole = Number(user.role);

    if (typeof roleGuard === 'number') {
      haveAccess = roleGuard === userRole;
    } else if (roleGuard instanceof Array) {
      haveAccess = roleGuard.some((e) => e === userRole);
    } else {
      const serviceInstance = this.moduleRef.get(roleGuard.alternative.inject, {
        strict: false,
      });

      const result = roleGuard.alternative.use(
        serviceInstance,
        { ...user },
        { ...query, ...params },
      );

      haveAccess = result instanceof Promise ? await result : result;
    }

    return haveAccess;
  }
}
