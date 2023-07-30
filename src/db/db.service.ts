import { Injectable } from '@nestjs/common';

import { AlbumModel } from './models/album';
import { ArtistModel } from './models/artist';
import { FavoritesModel } from './models/favorites';
import { TrackModel } from './models/track';
import { UserModel } from './models/user';
import { IDatabase } from './types';

@Injectable()
export class DatabaseService implements IDatabase {
  readonly users = new UserModel();
  readonly artists = new ArtistModel();
  readonly albums = new AlbumModel();
  readonly tracks = new TrackModel();
  readonly favorites = new FavoritesModel();
}
