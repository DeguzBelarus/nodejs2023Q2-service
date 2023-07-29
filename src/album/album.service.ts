import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

import { ICreateAlbumDto, IUpdateAlbumDto } from 'src/types/types';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(private readonly dataBase: DbService) {}

  getAll() {
    return this.dataBase.albums.findAll();
  }

  getById(id: string, response: Response) {
    const getAlbumByIdResult = this.dataBase.albums.findById(id);
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
    const albumCreationResult = this.dataBase.albums.create(
      this.dataBase.artists,
      createAlbumDto,
    );
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
    const albumUpdatingResult = this.dataBase.albums.update(
      id,
      this.dataBase.artists,
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
    const albumDeletionResult = this.dataBase.albums.delete(
      id,
      this.dataBase.tracks,
      this.dataBase.favorites,
    );
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
