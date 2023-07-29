import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

import { ICreateTrackDto, IUpdateTrackDto } from 'src/types/types';
import { DatabaseService } from 'src/db/db.service';

@Injectable()
export class TrackService {
  constructor(private readonly dataBase: DatabaseService) {}

  getAll() {
    return this.dataBase.tracks.findAll();
  }

  getById(id: string, response: Response) {
    const getTrackByIdResult = this.dataBase.tracks.findById(id);
    switch (getTrackByIdResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the track with the specified ID was not found' });
        break;
      default:
        response.status(HttpStatus.OK).send(getTrackByIdResult);
    }
  }

  createTrack(createTrackDto: ICreateTrackDto, response: Response) {
    const trackCreationResult = this.dataBase.tracks.create(
      this.dataBase.artists,
      this.dataBase.albums,
      createTrackDto,
    );
    switch (trackCreationResult) {
      case 'insufficient data for creation':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'insufficient data to create a track' });
        break;
      case 'invalid data':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid data received' });
        break;
      default:
        response.status(HttpStatus.CREATED).send(trackCreationResult);
    }
  }

  updateTrack(id: string, updateTrackDto: IUpdateTrackDto, response: Response) {
    const trackUpdatingResult = this.dataBase.tracks.update(
      id,
      this.dataBase.artists,
      this.dataBase.albums,
      updateTrackDto,
    );
    switch (trackUpdatingResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case 'invalid data':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid data received' });
        break;
      case 'insufficient data for updating':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'insufficient data to update a track' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the track with the specified ID was not found' });
        break;
      default:
        response.status(HttpStatus.OK).send(trackUpdatingResult);
    }
  }

  deleteTrack(id: string, response: Response) {
    const trackDeletionResult = this.dataBase.tracks.delete(
      id,
      this.dataBase.favorites,
    );
    switch (trackDeletionResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the track with the specified ID was not found' });
        break;
      case 'success':
        response.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
