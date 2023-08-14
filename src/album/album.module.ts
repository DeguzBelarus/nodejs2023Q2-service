import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumEntity } from 'src/album/album.entity';
import { DtoValidatorModule } from 'src/dtoValidator/dtoValidator.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [
    DtoValidatorModule,
    ArtistModule,
    TypeOrmModule.forFeature([AlbumEntity]),
  ],
  exports: [TypeOrmModule],
})
export class AlbumModule {}
