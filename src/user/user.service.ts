import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

import db from '../db/db';
import { ICreateUserDto, IUpdatePasswordDto } from 'src/types/types';

@Injectable()
export class UserService {
  getAll() {
    return db.users.findAll();
  }

  getById(id: string, response: Response) {
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

  createUser(createUserDto: ICreateUserDto, response: Response) {
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

  updateUser(
    id: string,
    updatePasswordDto: IUpdatePasswordDto,
    response: Response,
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

  deleteUser(id: string, response: Response) {
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
