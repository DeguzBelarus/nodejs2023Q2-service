import {
  Req,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/dtoValidator/dto/user';
import { AuthRefreshGuard } from 'src/guards/auth-refresh.guard';
import { UserSafe } from 'src/user/user-safe.schema';

type RequestWithUserPayloadType = Request & { user: UserSafe };

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

  @UseGuards(AuthRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async authRefresh(@Req() request: RequestWithUserPayloadType) {
    const { user } = request;
    return await this.authService.authRefresh(user);
  }
}
