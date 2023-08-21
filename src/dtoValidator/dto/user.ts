import { MaxLength, MinLength } from 'class-validator';
import { ICreateUserDto, IUpdatePasswordDto } from 'src/types/types';

export class CreateUserDto implements ICreateUserDto {
  @MinLength(3)
  @MaxLength(255)
  login: string;

  @MinLength(3)
  password: string;
}

export class LoginUserDto implements ICreateUserDto {
  login: string;

  password: string;
}

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @MinLength(3)
  oldPassword: string;

  @MinLength(3)
  newPassword: string;
}
