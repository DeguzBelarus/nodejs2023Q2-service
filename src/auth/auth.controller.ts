import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/dtoValidator/dto/user';
import { AuthGuard } from 'src/guards/auth.guard';
import { IUserSafe } from 'src/types/types';

type RequestWithUserData = Request & { user: IUserSafe };

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async authRefresh(@Req() request: RequestWithUserData) {
    const { user } = request;
    return await this.authService.authRefresh(user);
  }
}
