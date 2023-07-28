import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

import db from '../db/db';
import { ICreateAlbumDto, IUpdateAlbumDto } from 'src/types/types';

const { albums: albumModel, artists: artistModel, tracks: trackModel } = db;

@Injectable()
export class AlbumService {
  getAll() {
    return albumModel.findAll();
  }

  getById(id: string, response: Response) {
    const getAlbumByIdResult = albumModel.findById(id);
    switch (getAlbumByIdResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the album with the specified ID was not found' });
        break;
      default:
        response.status(HttpStatus.OK).send(getAlbumByIdResult);
    }
  }

  createAlbum(createAlbumDto: ICreateAlbumDto, response: Response) {
    const albumCreationResult = albumModel.create(artistModel, createAlbumDto);
    switch (albumCreationResult) {
      case 'insufficient data for creation':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'insufficient data to create an album' });
        break;
      case 'invalid data':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid data received' });
        break;
      default:
        response.status(HttpStatus.CREATED).send(albumCreationResult);
    }
  }

  updateAlbum(id: string, updateAlbumDto: IUpdateAlbumDto, response: Response) {
    const albumUpdatingResult = albumModel.update(
      id,
      artistModel,
      updateAlbumDto,
    );
    switch (albumUpdatingResult) {
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
          .send({ message: 'insufficient data to update an album' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the album with the specified ID was not found' });
        break;
      default:
        response.status(HttpStatus.OK).send(albumUpdatingResult);
    }
  }

  deleteAlbum(id: string, response: Response) {
    const albumDeletionResult = albumModel.delete(id, trackModel);
    switch (albumDeletionResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the album with the specified ID was not found' });
        break;
      case 'success':
        response.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
