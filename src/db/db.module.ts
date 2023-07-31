import { Module } from '@nestjs/common';

import { DatabaseService } from './db.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DbModule {}
