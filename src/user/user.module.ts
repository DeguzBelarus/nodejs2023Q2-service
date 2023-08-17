import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DtoValidatorModule } from 'src/dtoValidator/dtoValidator.module';
import { UserEntity } from './user.entity';
import { LoggingModule } from 'src/logger/logger.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    DtoValidatorModule,
    TypeOrmModule.forFeature([UserEntity]),
    LoggingModule,
  ],
})
export class UserModule {}
