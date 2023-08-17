import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { typeORMdataSourceOptions } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TrackModule } from './track/track.module';
import { LoggingInterceptor } from './logger/logger.interceptor';
import { LoggingService } from './logger/logger.service';
import { LoggingSaveService } from './logger/logger-save.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeORMdataSourceOptions),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
  ],
  providers: [
    LoggingService,
    LoggingSaveService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
