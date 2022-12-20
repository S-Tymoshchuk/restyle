export interface IAuthJWTGuardOptions<T = any> {
  applySwaggerGuard?: boolean;
  roleGuard?: RolesOptions<T> | number | number[];
}

interface RoleAlternative<T> {
  inject: T;
  use: (
    service: T,
    authData?: { _id: string; [key: string]: any },
    req?: { id?: string; [key: string]: any },
  ) => Promise<boolean> | boolean;
}

export interface RolesOptions<T = any> {
  role: number | number[];
  alternative?: RoleAlternative<T>;
}
