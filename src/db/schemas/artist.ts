import { v4 as uuidv4 } from 'uuid';

import { IArtist } from '../types';
import { IUpdateArtistDto } from 'src/types/types';

export class Artist implements IArtist {
  id = uuidv4();
  name: string;
  grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.name = name;
    this.grammy = grammy;
  }

  updateData(artistData: IUpdateArtistDto): IArtist {
    if (artistData.name) {
      this.name = artistData.name;
    }
    if (typeof artistData.grammy === 'boolean') {
      this.grammy = artistData.grammy;
    }
    return this;
  }
}
