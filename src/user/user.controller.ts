import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from 'src/db/dto/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const getUserByIdResult = this.userService.getById(id);
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

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const userCreationResult = this.userService.createUser(createUserDto);
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

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const userUpdatingResult = this.userService.updateUser(
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
  deleteUser(@Param('id') id: string) {
    const userDeletionResult = this.userService.deleteUser(id);
    switch (userDeletionResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case "entity doesn't exist":
        throw new NotFoundException({ message: 'invalid uuid' });
    }
  }
}
