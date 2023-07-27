import { v4 as uuidv4 } from 'uuid';

import { ITrack, IUpdateTrackDto } from '../types';
import { Nullable } from 'src/types/types';

export class Track implements ITrack {
  id = uuidv4();
  name: string;
  artistId: Nullable<string>;
  albumId: Nullable<string>;
  duration: number;

  constructor(
    name: string,
    artistId: Nullable<string>,
    albumId: Nullable<string>,
    duration: number,
  ) {
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }

  updateData(trackData: IUpdateTrackDto): ITrack {
    if (trackData.name) {
      this.name = trackData.name;
    }
    if (trackData.duration) {
      this.duration = trackData.duration;
    }
    if (trackData.albumId !== undefined) {
      this.albumId = trackData.albumId;
    }
    if (trackData.artistId !== undefined) {
      this.artistId = trackData.artistId;
    }
    return this;
  }
}
