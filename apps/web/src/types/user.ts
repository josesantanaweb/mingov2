import type { Role } from './role';

export interface IUser {
  id: string;
  username: string;
  name: string;
  balance: number;
  raking: number;
  email: string;
  image?: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}
export interface ICreateUser {
  username: string;
  name: string;
  balance?: number;
  email: string;
  image?: string;
  role?: Role;
}

export interface IUpdateUser extends Partial<ICreateUser> {
  raking?: number;
}
