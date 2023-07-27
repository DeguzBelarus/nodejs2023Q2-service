import { v4 as uuidv4 } from 'uuid';

import { IAlbum, IUpdateAlbumDto } from '../types';
import { Nullable } from 'src/types/types';

export class Album implements IAlbum {
  id = uuidv4();
  name: string;
  year: number;
  artistId: Nullable<string>;

  constructor(name: string, year: number, artistId: Nullable<string>) {
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  updateData(albumData: IUpdateAlbumDto): IAlbum {
    if (albumData.name) {
      this.name = albumData.name;
    }
    if (albumData.year) {
      this.year = albumData.year;
    }
    if (albumData.artistId === null || typeof albumData.artistId === 'string') {
      this.artistId = albumData.artistId;
    }
    return this;
  }
}
