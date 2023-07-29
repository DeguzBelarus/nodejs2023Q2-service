import {
  Controller,
  Res,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

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
  getById(@Param('id') id: string, @Res() response: Response) {
    const getUserByIdResult = this.userService.getById(id);
    switch (getUserByIdResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the user with the specified ID was not found' });
        break;
      default:
        response.status(HttpStatus.OK).send(getUserByIdResult);
    }
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    const userCreationResult = this.userService.createUser(createUserDto);
    switch (userCreationResult) {
      case 'insufficient data for creation':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'insufficient data to create user' });
        break;
      case 'login already in use':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'specified login name is already in use' });
        break;
      case 'invalid data':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid data received' });
        break;
      default:
        response.status(HttpStatus.CREATED).send(userCreationResult);
    }
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Res() response: Response,
  ) {
    const userUpdatingResult = this.userService.updateUser(
      id,
      updatePasswordDto,
    );
    switch (userUpdatingResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case 'invalid data':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid data received' });
        break;
      case "passwords don't match":
        response
          .status(HttpStatus.FORBIDDEN)
          .send({ message: 'the specified old password is wrong' });
        break;
      case "user doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the user with the specified ID was not found' });
        break;
      default:
        response.status(HttpStatus.OK).send(userUpdatingResult);
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string, @Res() response: Response) {
    const userDeletionResult = this.userService.deleteUser(id);
    switch (userDeletionResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the user with the specified ID was not found' });
        break;
      case 'success':
        response.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
