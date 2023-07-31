import { Injectable } from '@nestjs/common';

import { ICreateUserDto, IUpdatePasswordDto } from 'src/types/types';
import { DatabaseService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly dataBase: DatabaseService) {}

  getAll() {
    return this.dataBase.users.findAll();
  }

  getById(id: string) {
    return this.dataBase.users.findById(id);
  }

  createUser(createUserDto: ICreateUserDto) {
    return this.dataBase.users.create(createUserDto);
  }

  updateUser(id: string, updatePasswordDto: IUpdatePasswordDto) {
    return this.dataBase.users.updatePassword(id, updatePasswordDto);
  }

  deleteUser(id: string) {
    return this.dataBase.users.delete(id);
  }
}
