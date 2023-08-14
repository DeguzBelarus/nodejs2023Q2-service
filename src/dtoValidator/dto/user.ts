import { MinLength } from 'class-validator';
import { ICreateUserDto, IUpdatePasswordDto } from 'src/types/types';

export class CreateUserDto implements ICreateUserDto {
  @MinLength(1)
  login: string;

  @MinLength(1)
  password: string;
}

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @MinLength(1)
  oldPassword: string;

  @MinLength(1)
  newPassword: string;
}
