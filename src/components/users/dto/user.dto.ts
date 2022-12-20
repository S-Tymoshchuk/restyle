export enum UserRoles {
  customer = 1,
  tailor = 2,
}

export interface UserDbDto {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: number;
  phone?: string;
  password?: string;
  isDelete?: boolean;
  credentialId?: number;
  isEmailConfirmed?: boolean;
  tailorId?: string;
}
