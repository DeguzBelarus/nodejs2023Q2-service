import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

import db from '../db/db';
import { ICreateArtistDto, IUpdateArtistDto } from 'src/types/types';

const { artists: artistModel, tracks: trackModel, albums: albumModel } = db;

@Injectable()
export class ArtistService {
  getAll() {
    return artistModel.findAll();
  }

  getById(id: string, response: Response) {
    const getArtistByIdResult = artistModel.findById(id);
    switch (getArtistByIdResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the artist with the specified ID was not found' });
        break;
      default:
        response.status(HttpStatus.OK).send(getArtistByIdResult);
    }
  }

  createArtist(createArtistDto: ICreateArtistDto, response: Response) {
    const artistCreationResult = artistModel.create(createArtistDto);
    switch (artistCreationResult) {
      case 'insufficient data for creation':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'insufficient data to create an artist' });
        break;
      case 'invalid data':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid data received' });
        break;
      default:
        response.status(HttpStatus.CREATED).send(artistCreationResult);
    }
  }

  updateArtist(
    id: string,
    updateArtistDto: IUpdateArtistDto,
    response: Response,
  ) {
    const artistUpdatingResult = artistModel.update(id, updateArtistDto);
    switch (artistUpdatingResult) {
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
          .send({ message: 'insufficient data to update an artist' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the artist with the specified ID was not found' });
        break;
      default:
        response.status(HttpStatus.OK).send(artistUpdatingResult);
    }
  }

  deleteArtist(id: string, response: Response) {
    const artistDeletionResult = artistModel.delete(id, trackModel, albumModel);
    switch (artistDeletionResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the user with the specified ID was not found' });
        break;
      case 'success':
        response.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
