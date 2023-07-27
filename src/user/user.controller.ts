import {
  Controller,
  Res,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';

import { ICreateUserDto, IUpdatePasswordDto } from 'src/types/types';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string, @Res() response: Response) {
    return this.userService.getById(id, response);
  }

  @Post()
  createUser(@Body() createUserDto: ICreateUserDto, @Res() response: Response) {
    return this.userService.createUser(createUserDto, response);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updatePasswordDto: IUpdatePasswordDto,
    @Res() response: Response,
  ) {
    return this.userService.updateUser(id, updatePasswordDto, response);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string, @Res() response: Response) {
    return this.userService.deleteUser(id, response);
  }
}
