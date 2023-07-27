import { validate as uuidValidate } from 'uuid';

import { User } from '../schemas';
import {
  CreateEntityResultType,
  DeleteEntityResultType,
  FindEntityByIdResultType,
  ICreateUserDto,
  IUpdatePasswordDto,
  IUser,
  IUserModel,
  IUserSafe,
  UpdateUserPasswordResultType,
} from '../types';

export class UserModel implements IUserModel {
  private table: Array<IUser> = [];

  findAll(): Array<IUserSafe> {
    return this.table.map((user) => {
      delete user.password;
      return user;
    });
  }

  findById(id: string): FindEntityByIdResultType<IUserSafe> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundUser = this.table.find((entity) => entity.id === id);
    if (!foundUser) {
      return "entity doesn't exist";
    } else {
      delete foundUser.password;
      return foundUser;
    }
  }

  create(userData: ICreateUserDto): CreateEntityResultType<IUserSafe> {
    if (
      typeof userData.login === 'undefined' ||
      typeof userData.password === 'undefined'
    )
      return 'insufficient data for creation';
    if (
      typeof userData.login !== 'string' &&
      typeof userData.password !== 'string'
    )
      return 'invalid data';
    if (!userData.login.length && !userData.password.length)
      return 'invalid data';
    const newUser = new User(userData.login, userData.password);
    this.table.push(newUser);
    delete newUser.password;
    return newUser;
  }

  updatePassword(
    id: string,
    passwordsData: IUpdatePasswordDto,
  ): UpdateUserPasswordResultType {
    if (!uuidValidate(id)) return 'invalid uuid';
    if (!passwordsData.newPassword && !passwordsData.oldPassword)
      return 'invalid data';
    if (
      typeof passwordsData.newPassword !== 'string' &&
      typeof passwordsData.oldPassword !== 'string'
    )
      return 'invalid data';
    if (!passwordsData.newPassword.length && !passwordsData.oldPassword.length)
      return 'invalid data';
    if (passwordsData.newPassword !== passwordsData.oldPassword)
      return "passwords don't match";
    const foundUser = this.table.find((user) => user.id === id);
    if (!foundUser) {
      return "user doesn't exist";
    } else {
      return foundUser.updatePassword(passwordsData.newPassword);
    }
  }

  delete(id: string): DeleteEntityResultType {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundUser = this.table.find((user) => user.id === id);
    return !foundUser ? "entity doesn't exist" : 'success';
  }
}
