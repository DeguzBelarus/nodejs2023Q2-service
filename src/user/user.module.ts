import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [DbModule],
})
export class UserModule {}
