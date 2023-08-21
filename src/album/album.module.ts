import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumEntity } from 'src/album/album.entity';
import { DtoValidatorModule } from 'src/dtoValidator/dtoValidator.module';
import { ArtistModule } from 'src/artist/artist.module';
import { LoggingModule } from 'src/logger/logger.module';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [
    DtoValidatorModule,
    ArtistModule,
    TypeOrmModule.forFeature([AlbumEntity]),
    LoggingModule,
  ],
  exports: [TypeOrmModule],
})
export class AlbumModule {}
