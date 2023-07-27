import {
  Controller,
  Res,
  Param,
  Body,
  HttpStatus,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';

import db from '../db/db';
import { ICreateUserDto, IUpdatePasswordDto } from 'src/types/types';

@Controller('user')
export class UserController {
  @Get()
  getAll() {
    return db.users.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string, @Res() response: Response) {
    const getUserByIdResult = db.users.findById(id);
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

  @Post()
  createUser(@Body() createUserDto: ICreateUserDto, @Res() response: Response) {
    const userCreationResult = db.users.create(createUserDto);
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

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updatePasswordDto: IUpdatePasswordDto,
    @Res() response: Response,
  ) {
    const userUpdatingResult = db.users.updatePassword(id, updatePasswordDto);
    switch (userUpdatingResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
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
      case 'invalid data':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid data received' });
        break;
      default:
        response.status(HttpStatus.OK).send(userUpdatingResult);
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string, @Res() response: Response) {
    const userDeletionResult = db.users.delete(id);

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
