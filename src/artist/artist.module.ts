import { Module } from '@nestjs/common';

import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
  imports: [DbModule],
})
export class ArtistModule {}
