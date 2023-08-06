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
    if (!userData.login.length || !userData.password.length)
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
  }
}
