import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import {
  FavoriteAlbumsEntity,
  FavoriteArtistsEntity,
  FavoriteTracksEntity,
} from './favorites.entity';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [
    ArtistModule,
    AlbumModule,
    TrackModule,
    TypeOrmModule.forFeature([FavoriteArtistsEntity]),
    TypeOrmModule.forFeature([FavoriteAlbumsEntity]),
    TypeOrmModule.forFeature([FavoriteTracksEntity]),
  ],
})
export class FavoritesModule {}
