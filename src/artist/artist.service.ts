import { Injectable } from '@nestjs/common';

import { ICreateArtistDto, IUpdateArtistDto } from 'src/types/types';
import { DatabaseService } from 'src/db/db.service';

@Injectable()
export class ArtistService {
  constructor(private readonly dataBase: DatabaseService) {}

  getAll() {
    return this.dataBase.artists.findAll();
  }

  getById(id: string) {
    return this.dataBase.artists.findById(id);
  }

  createArtist(createArtistDto: ICreateArtistDto) {
    return this.dataBase.artists.create(createArtistDto);
  }

  updateArtist(id: string, updateArtistDto: IUpdateArtistDto) {
    return this.dataBase.artists.update(id, updateArtistDto);
  }

  deleteArtist(id: string) {
    return this.dataBase.artists.delete(
      id,
      this.dataBase.tracks,
      this.dataBase.albums,
      this.dataBase.favorites,
    );
  }
}
