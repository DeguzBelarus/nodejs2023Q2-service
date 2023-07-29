import { Injectable } from '@nestjs/common';

import { ICreateTrackDto, IUpdateTrackDto } from 'src/types/types';
import { DatabaseService } from 'src/db/db.service';

@Injectable()
export class TrackService {
  constructor(private readonly dataBase: DatabaseService) {}

  getAll() {
    return this.dataBase.tracks.findAll();
  }

  getById(id: string) {
    return this.dataBase.tracks.findById(id);
  }

  createTrack(createTrackDto: ICreateTrackDto) {
    return this.dataBase.tracks.create(
      this.dataBase.artists,
      this.dataBase.albums,
      createTrackDto,
    );
  }

  updateTrack(id: string, updateTrackDto: IUpdateTrackDto) {
    return this.dataBase.tracks.update(
      id,
      this.dataBase.artists,
      this.dataBase.albums,
      updateTrackDto,
    );
  }

  deleteTrack(id: string) {
    return this.dataBase.tracks.delete(id, this.dataBase.favorites);
  }
}
