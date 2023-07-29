import { Module } from '@nestjs/common';

import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  providers: [TrackService],
  controllers: [TrackController],
  imports: [DbModule],
})
export class TrackModule {}
