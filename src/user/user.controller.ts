import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from 'src/dtoValidator/dto/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const getUserByIdResult = await this.userService.getById(id);
    switch (getUserByIdResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case "entity doesn't exist":
        throw new NotFoundException({
          message: 'the user with the specified ID was not found',
        });
      default:
        return getUserByIdResult;
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const userCreationResult = await this.userService.createUser(createUserDto);
    switch (userCreationResult) {
      case 'insufficient data for creation':
        throw new BadRequestException({
          message: 'insufficient data to create user',
        });
      case 'login already in use':
        throw new BadRequestException({
          message: 'specified login name is already in use',
        });
      case 'invalid data':
        throw new BadRequestException({
          message: 'invalid data received',
        });
      default:
        return userCreationResult;
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const userUpdatingResult = await this.userService.updateUser(
      id,
      updatePasswordDto,
    );
    switch (userUpdatingResult) {
      case 'invalid uuid':
        throw new BadRequestException({
          message: 'invalid uuid',
        });
      case 'invalid data':
        throw new BadRequestException({
          message: 'invalid data received',
        });
      case "passwords don't match":
        throw new ForbiddenException({
          message: 'the specified old password is wrong',
        });
      case "user doesn't exist":
        throw new NotFoundException({
          message: 'the user with the specified ID was not found',
        });
      default:
        return userUpdatingResult;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    const userDeletionResult = await this.userService.deleteUser(id);
    switch (userDeletionResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case "entity doesn't exist":
        throw new NotFoundException({
          message: 'the user with the specified ID was not found',
        });
    }
  }
}
