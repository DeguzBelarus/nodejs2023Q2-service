import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DtoValidatorModule } from 'src/dtoValidator/dtoValidator.module';
import { UserEntity } from 'src/user/user.entity';
import { LoggingModule } from 'src/logger/logger.module';

@Module({
  imports: [
    DtoValidatorModule,
    TypeOrmModule.forFeature([UserEntity]),
    LoggingModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
