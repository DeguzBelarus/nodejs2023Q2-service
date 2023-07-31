import { Module } from '@nestjs/common';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [DbModule],
})
export class AlbumModule {}
