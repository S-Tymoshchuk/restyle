import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { RolesGuard } from '@decorators/role.guard';
import { IAuthJWTGuardOptions } from '@decorators/auth-guard.options';
import { JwtAuthenticationGuard } from '@components/authentication/guards/jwt-authentication.guard';

export function AuthJWT(options?: IAuthJWTGuardOptions) {
  const opts = { applySwaggerGuard: true, ...options };
  const decorators = [
    SetMetadata('roleGuardOptions', opts.roleGuard),
    UseGuards(JwtAuthenticationGuard, RolesGuard),
    ApiForbiddenResponse({ description: 'Forbidden' }),
  ];

  if (opts.applySwaggerGuard) {
    decorators.push(
      ApiBearerAuth(),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
  }

  return applyDecorators(...decorators);
}
