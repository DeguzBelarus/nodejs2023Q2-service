import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly dataBase: DatabaseService) {}

  get() {
    return this.dataBase.favorites.get();
  }

  addArtist(id: string) {
    return this.dataBase.favorites.addArtist(id, this.dataBase.artists);
  }

  addAlbum(id: string) {
    return this.dataBase.favorites.addAlbum(id, this.dataBase.albums);
  }

  addTrack(id: string) {
    return this.dataBase.favorites.addTrack(id, this.dataBase.tracks);
  }

  deleteArtist(id: string) {
    return this.dataBase.favorites.deleteArtist(id);
  }

  deleteAlbum(id: string) {
    return this.dataBase.favorites.deleteAlbum(id);
  }

  deleteTrack(id: string) {
    return this.dataBase.favorites.deleteTrack(id);
  }
}
