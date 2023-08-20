import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { DtoUserValidatorService } from 'src/dtoValidator/services/dtoUserValidator.service';
import { UserEntity } from 'src/user/user.entity';
import { LoggingService } from 'src/logger/logger.service';
import { CreateUserDto, LoginUserDto } from 'src/dtoValidator/dto/user';
import { IUserSafe } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly dtoUserValidator: DtoUserValidatorService,
    private readonly loggingService: LoggingService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const signUpUserDtoValidationResult =
      this.dtoUserValidator.createUserDtoValidate(createUserDto);
    if (typeof signUpUserDtoValidationResult === 'string') {
      throw new BadRequestException({
        message: signUpUserDtoValidationResult,
      });
    }
    this.loggingService.verbose(`Checking login availability...`);
    const userWithTheSameLogin = await this.userRepository.findOneBy({
      login: createUserDto.login,
    });
    if (userWithTheSameLogin) {
      throw new BadRequestException({
        message: 'Request contains login name that already in use',
      });
    }
    const cryptedPassword = await hash(
      createUserDto.password,
      Number(process.env.CRYPT_SALT) || 10,
    );
    createUserDto.password = cryptedPassword;
    const newUser = await this.userRepository.save(createUserDto);
    this.loggingService.verbose(`New user has been successfully created`);
    return { id: newUser.id };
  }

  async login(loginUserDto: LoginUserDto) {
    const loginUserDtoValidationResult =
      this.dtoUserValidator.loginUserDtoValidate(loginUserDto);
    if (typeof loginUserDtoValidationResult === 'string') {
      throw new BadRequestException({
        message: loginUserDtoValidationResult,
      });
    }
    this.loggingService.verbose(`Checking the authorization data...`);
    const foundUser = await this.userRepository.findOneBy({
      login: loginUserDto.login,
    });
    if (!foundUser) {
      throw new UnauthorizedException({
        message: 'Invalid login or password',
      });
    }
    const passwordsIsMatch = await compare(
      loginUserDto.password,
      foundUser.password,
    );
    if (!passwordsIsMatch) {
      throw new UnauthorizedException({
        message: 'Invalid login or password',
      });
    }
    const accessToken = await this.jwtService.signAsync({
      id: foundUser.id,
      login: foundUser.login,
    });
    this.loggingService.verbose(`User successfully signed in`);
    return { accessToken };
  }

  async authRefresh(user: IUserSafe) {
    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      login: user.login,
    });
    this.loggingService.verbose(`Access token has been successfully refreshed`);
    return { accessToken };
  }
}
