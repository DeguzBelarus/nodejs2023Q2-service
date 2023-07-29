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
    return this.userService.getById(id, response);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    return this.userService.createUser(createUserDto, response);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Res() response: Response,
  ) {
    return this.userService.updateUser(id, updatePasswordDto, response);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string, @Res() response: Response) {
    return this.userService.deleteUser(id, response);
  }
}
