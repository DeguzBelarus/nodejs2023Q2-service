import { AlbumModel } from './models/album';
import { ArtistModel } from './models/artist';
import { FavoritesModel } from './models/favorites';
import { TrackModel } from './models/track';
import { UserModel } from './models/user';
import { IDb } from './types';

class Db implements IDb {
  users = new UserModel();
  artists = new ArtistModel();
  albums = new AlbumModel();
  tracks = new TrackModel();
  favorites = new FavoritesModel();
}

export default new Db();
