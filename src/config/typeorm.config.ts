import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import {
  FavoriteAlbumsEntity,
  FavoriteArtistsEntity,
  FavoriteTracksEntity,
} from 'src/favorites/favorites.entity';
import { TrackEntity } from 'src/track/track.entity';
import { UserEntity } from 'src/user/user.entity';

config();
export const typeORMdataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST_DEV,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [
    UserEntity,
    ArtistEntity,
    AlbumEntity,
    TrackEntity,
    FavoriteArtistsEntity,
    FavoriteAlbumsEntity,
    FavoriteTracksEntity,
  ],
  migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
  migrationsRun: true,
  synchronize: false,
  logging: true,
};

const typeORMdataSource = new DataSource(typeORMdataSourceOptions);
export default typeORMdataSource;
