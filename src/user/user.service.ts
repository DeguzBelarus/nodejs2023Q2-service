import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as uuidValidate } from 'uuid';

import {
  CreateUserResultType,
  DeleteEntityResultType,
  FindEntityByIdResultType,
  ICreateUserDto,
  IUpdatePasswordDto,
  IUserSafe,
  UpdateUserPasswordResultType,
} from 'src/types/types';
import { UserEntity } from 'src/user/user.entity';
import { UserSafe } from './user-safe.schema';
import { DtoUserValidatorService } from 'src/dtoValidator/services/dtoUserValidator.service';

@Injectable()
export class UserService {
  constructor(
    private readonly dtoUserValidator: DtoUserValidatorService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    const allUsers = await this.userRepository.find();
    return allUsers.map((user) => {
      return new UserSafe(
        user.id,
        user.login,
        user.version,
        Number(user.createdAt),
        Number(user.updatedAt),
      );
    });
  }

  async getById(id: string): Promise<FindEntityByIdResultType<IUserSafe>> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundUser = await this.userRepository.findOneBy({ id });
    return foundUser
      ? new UserSafe(
          foundUser.id,
          foundUser.login,
          foundUser.version,
          Number(foundUser.createdAt),
          Number(foundUser.updatedAt),
        )
      : "entity doesn't exist";
  }

  async createUser(
    createUserDto: ICreateUserDto,
  ): Promise<CreateUserResultType> {
    const createUserDtoValidationResult =
      this.dtoUserValidator.createUserDtoValidate(createUserDto);
    if (typeof createUserDtoValidationResult === 'string') {
      return createUserDtoValidationResult;
    }
    const userWithTheSameLogin = await this.userRepository.findOneBy({
      login: createUserDto.login,
    });
    if (userWithTheSameLogin) return 'login already in use';
    const newUser = await this.userRepository.save(createUserDto);
    return new UserSafe(
      newUser.id,
      newUser.login,
      newUser.version,
      Number(newUser.createdAt),
      Number(newUser.updatedAt),
    );
  }

  async updateUser(
    id: string,
    updatePasswordDto: IUpdatePasswordDto,
  ): Promise<UpdateUserPasswordResultType> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const updatePasswordDtoValidationResult =
      this.dtoUserValidator.updatePassword(updatePasswordDto);
    if (typeof updatePasswordDtoValidationResult === 'string') {
      return updatePasswordDtoValidationResult;
    }
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) return "user doesn't exist";
    if (foundUser.password !== updatePasswordDto.oldPassword) {
      return "passwords don't match";
    }
    foundUser.password = updatePasswordDto.newPassword;
    foundUser.version = ++foundUser.version;
    await foundUser.save();
    return new UserSafe(
      foundUser.id,
      foundUser.login,
      foundUser.version,
      Number(foundUser.createdAt),
      Number(foundUser.updatedAt),
    );
  }

  async deleteUser(id: string): Promise<DeleteEntityResultType> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) return "entity doesn't exist";
    await foundUser.remove();
    return 'success';
  }
}
