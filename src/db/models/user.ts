import { validate as uuidValidate } from 'uuid';

import { User, UserSafe } from '../schemas';
import {
  CreateUserResultType,
  DeleteEntityResultType,
  FindEntityByIdResultType,
  IUser,
  IUserModel,
  IUserSafe,
  UpdateUserPasswordResultType,
} from '../types';
import { ICreateUserDto, IUpdatePasswordDto } from 'src/types/types';

export class UserModel implements IUserModel {
  private table: Array<IUser> = [];

  findAll(): Array<IUserSafe> {
    return this.table.map((user) => {
      return new UserSafe(
        user.id,
        user.login,
        user.version,
        user.createdAt,
        user.updatedAt,
      );
    });
  }

  findById(id: string): FindEntityByIdResultType<IUserSafe> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundUser = this.table.find((entity) => entity.id === id);
    if (!foundUser) {
      return "entity doesn't exist";
    } else {
      return new UserSafe(
        foundUser.id,
        foundUser.login,
        foundUser.version,
        foundUser.createdAt,
        foundUser.updatedAt,
      );
    }
  }

  create(userData: ICreateUserDto): CreateUserResultType {
    if (
      typeof userData.login === 'undefined' ||
      typeof userData.password === 'undefined'
    )
      return 'insufficient data for creation';
    if (
      typeof userData.login !== 'string' ||
      typeof userData.password !== 'string'
    )
      return 'invalid data';
    if (!userData.login.length && !userData.password.length)
      return 'invalid data';
    if (this.table.some((user) => user.login === userData.login))
      return 'login already in use';
    const newUser = new User(userData.login, userData.password);
    this.table.push(newUser);
    return new UserSafe(
      newUser.id,
      newUser.login,
      newUser.version,
      newUser.createdAt,
      newUser.updatedAt,
    );
  }

  updatePassword(
    id: string,
    passwordsData: IUpdatePasswordDto,
  ): UpdateUserPasswordResultType {
    if (!uuidValidate(id)) return 'invalid uuid';
    if (!passwordsData.newPassword && !passwordsData.oldPassword)
      return 'invalid data';
    if (
      typeof passwordsData.newPassword !== 'string' ||
      typeof passwordsData.oldPassword !== 'string'
    )
      return 'invalid data';
    if (!passwordsData.newPassword.length && !passwordsData.oldPassword.length)
      return 'invalid data';
    const foundUser = this.table.find((user) => user.id === id);
    if (!foundUser) {
      return "user doesn't exist";
    } else {
      if (foundUser.password !== passwordsData.oldPassword)
        return "passwords don't match";
      const updatedUser = foundUser.updatePassword(passwordsData.newPassword);
      return new UserSafe(
        updatedUser.id,
        updatedUser.login,
        updatedUser.version,
        updatedUser.createdAt,
        updatedUser.updatedAt,
      );
    }
  }

  delete(id: string): DeleteEntityResultType {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundUser = this.table.find((user) => user.id === id);
    return !foundUser ? "entity doesn't exist" : 'success';
  }
}
