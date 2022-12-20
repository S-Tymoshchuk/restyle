export interface AuthUserData {
  token: string;
  role: string;
}

export interface IReqUser extends AuthUserData {
  id: string;
}
