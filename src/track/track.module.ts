import { Module } from '@nestjs/common';

import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from 'src/track/track.entity';
import { DtoValidatorModule } from 'src/dtoValidator/dtoValidator.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { LoggingModule } from 'src/logger/logger.module';

@Module({
  providers: [TrackService],
  controllers: [TrackController],
  imports: [
    DtoValidatorModule,
    ArtistModule,
    AlbumModule,
    TypeOrmModule.forFeature([TrackEntity]),
    LoggingModule,
  ],
  exports: [TypeOrmModule],
})
export class TrackModule {}
