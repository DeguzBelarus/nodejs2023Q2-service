import { IUserSafe } from 'src/types/types';

export class UserSafe implements IUserSafe {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(
    id: string,
    login: string,
    version: number,
    createdAt: number,
    updatedAt: number,
  ) {
    this.id = id;
    this.login = login;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
