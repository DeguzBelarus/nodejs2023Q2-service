import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/dtoValidator/dto/user';

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

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async authRefresh(@Body() body: { refreshToken?: string }) {
    const { refreshToken } = body;
    return await this.authService.authRefresh(refreshToken);
  }
}
