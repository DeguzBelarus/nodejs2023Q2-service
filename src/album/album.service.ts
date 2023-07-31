import { Injectable } from '@nestjs/common';

import { ICreateAlbumDto, IUpdateAlbumDto } from 'src/types/types';
import { DatabaseService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(private readonly dataBase: DatabaseService) {}

  getAll() {
    return this.dataBase.albums.findAll();
  }

  getById(id: string) {
    return this.dataBase.albums.findById(id);
  }

  createAlbum(createAlbumDto: ICreateAlbumDto) {
    return this.dataBase.albums.create(this.dataBase.artists, createAlbumDto);
  }

  updateAlbum(id: string, updateAlbumDto: IUpdateAlbumDto) {
    return this.dataBase.albums.update(
      id,
      this.dataBase.artists,
      updateAlbumDto,
    );
  }

  deleteAlbum(id: string) {
    return this.dataBase.albums.delete(
      id,
      this.dataBase.tracks,
      this.dataBase.favorites,
    );
  }
}
