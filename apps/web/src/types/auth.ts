import type { IUser } from './user';

export enum IAuthModal {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput extends ILoginInput {
  username: string;
  referredCode?: string;
}

export type IAuthInput = Partial<IRegisterInput> & ILoginInput;
