import { Injectable } from '@nestjs/common';

import {
  CreateUserResultType,
  ICreateUserDto,
  IUpdatePasswordDto,
  UpdateUserPasswordResultType,
} from 'src/types/types';

@Injectable()
export class DtoUserValidatorService {
  createUserDtoValidate(userData: ICreateUserDto): CreateUserResultType {
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
    if (userData.login.length < 3) {
      return 'min login length is 3 characters';
    }
    if (userData.login.length > 255) {
      return 'max login length is 255 characters';
    }
    if (userData.password.length < 3) {
      return 'min password length is 3 characters';
    }
    if (userData.password.length > 30) {
      return 'max password length is 30 characters';
    }
    if (!userData.password.match('^[a-zA-Z0-9]{3,30}')) {
      return 'incorrect password data';
    }
  }

  loginUserDtoValidate(userData: ICreateUserDto): CreateUserResultType {
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
  }

  updatePassword(
    passwordsData: IUpdatePasswordDto,
  ): UpdateUserPasswordResultType {
    if (!passwordsData.newPassword && !passwordsData.oldPassword)
      return 'invalid data';
    if (
      typeof passwordsData.newPassword !== 'string' ||
      typeof passwordsData.oldPassword !== 'string'
    )
      return 'invalid data';
    if (!passwordsData.newPassword.length || !passwordsData.oldPassword.length)
      return 'invalid data';
    if (passwordsData.newPassword.length < 3) {
      return 'min password length is 3 characters';
    }
    if (passwordsData.newPassword.length > 30) {
      return 'max password length is 30 characters';
    }
    if (!passwordsData.newPassword.match('^[a-zA-Z0-9]{3,30}')) {
      return 'incorrect password data';
    }
  }
}
