import { v4 as uuidv4 } from 'uuid';

import { IUser, IUserSafe } from '../types';

export class User implements IUser {
  id = uuidv4();
  login: string;
  password: string;
  version = 1;
  createdAt = Date.now();
  updatedAt = 0;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.updatedAt = this.createdAt;
  }

  updatePassword(newPassword: string): IUserSafe {
    this.password = newPassword;
    this.updatedAt = Date.now();
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
