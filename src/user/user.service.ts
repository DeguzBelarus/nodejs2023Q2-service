import { Injectable, OnModuleInit } from '@nestjs/common';
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
import { LoggingService } from 'src/logger/logger.service';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly dtoUserValidator: DtoUserValidatorService,
    private readonly loggingService: LoggingService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  onModuleInit() {
    this.loggingService.setContext(UserService.name);
  }

  async getAll() {
    this.loggingService.verbose('Getting all users data...');
    const allUsers = await this.userRepository.find();
    this.loggingService.verbose('All users data was successfully found');
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
    if (!uuidValidate(id)) {
      this.loggingService.error('Invalid uuid in request');
      return 'invalid uuid';
    }
    this.loggingService.verbose(`Searching for the user with ID ${id}...`);
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      this.loggingService.warn("Requested user doesn't exist");
    } else {
      this.loggingService.verbose(
        `User with ID ${id} data was successfully found`,
      );
    }
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
      this.loggingService.error(createUserDtoValidationResult);
      return createUserDtoValidationResult;
    }
    this.loggingService.verbose(`Checking login availability...`);
    const userWithTheSameLogin = await this.userRepository.findOneBy({
      login: createUserDto.login,
    });
    if (userWithTheSameLogin) {
      this.loggingService.error(
        'Request contains login name that already in use',
      );
      return 'login already in use';
    }
    const newUser = await this.userRepository.save(createUserDto);
    this.loggingService.verbose(`New user has been successfully created`);
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
    if (!uuidValidate(id)) {
      this.loggingService.error('Invalid uuid in request');
      return 'invalid uuid';
    }
    const updatePasswordDtoValidationResult =
      this.dtoUserValidator.updatePassword(updatePasswordDto);
    if (typeof updatePasswordDtoValidationResult === 'string') {
      this.loggingService.error(updatePasswordDtoValidationResult);
      return updatePasswordDtoValidationResult;
    }
    this.loggingService.verbose(`Searching for the user with ID ${id}...`);
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      this.loggingService.error(`Specified user with id ${id} doesn't exist`);
      return "user doesn't exist";
    }
    if (foundUser.password !== updatePasswordDto.oldPassword) {
      this.loggingService.error('Specified old password in request is wrong');
      return "passwords don't match";
    }
    foundUser.password = updatePasswordDto.newPassword;
    foundUser.version = ++foundUser.version;
    await foundUser.save();
    this.loggingService.verbose(
      `Password was successfully updated for user with ID ${id}`,
    );
    return new UserSafe(
      foundUser.id,
      foundUser.login,
      foundUser.version,
      Number(foundUser.createdAt),
      Number(foundUser.updatedAt),
    );
  }

  async deleteUser(id: string): Promise<DeleteEntityResultType> {
    if (!uuidValidate(id)) {
      this.loggingService.error('Invalid uuid in request');
      return 'invalid uuid';
    }
    this.loggingService.verbose(`Searching for the user with ID ${id}...`);
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      this.loggingService.error(`Specified user with ID ${id} doesn't exist`);
      return "entity doesn't exist";
    }
    await foundUser.remove();
    this.loggingService.verbose(`User with ID ${id} was successfully deleted`);
    return 'success';
  }
}
