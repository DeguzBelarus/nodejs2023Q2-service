import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

import { DatabaseService } from 'src/db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly dataBase: DatabaseService) {}

  get() {
    return this.dataBase.favorites.get();
  }

  addArtist(id: string, response: Response) {
    const addArtistToFavoritesResult = this.dataBase.favorites.addArtist(
      id,
      this.dataBase.artists,
    );
    switch (addArtistToFavoritesResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .send({ message: 'the artist with the specified ID was not found' });
        break;
      case 'success':
        response.status(HttpStatus.CREATED).send();
    }
  }

  addAlbum(id: string, response: Response) {
    const addAlbumToFavoritesResult = this.dataBase.favorites.addAlbum(
      id,
      this.dataBase.albums,
    );
    switch (addAlbumToFavoritesResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .send({ message: 'the album with the specified ID was not found' });
        break;
      case 'success':
        response.status(HttpStatus.CREATED).send();
    }
  }

  addTrack(id: string, response: Response) {
    const addTrackToFavoritesResult = this.dataBase.favorites.addTrack(
      id,
      this.dataBase.tracks,
    );
    switch (addTrackToFavoritesResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .send({ message: 'the track with the specified ID was not found' });
        break;
      case 'success':
        response.status(HttpStatus.CREATED).send();
    }
  }

  deleteArtist(id: string, response: Response) {
    const deleteArtistFromFavoritesResult =
      this.dataBase.favorites.deleteArtist(id);
    switch (deleteArtistFromFavoritesResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity isn't favorite":
        response.status(HttpStatus.NOT_FOUND).send({
          message:
            'the artist with the specified ID is not in the favorites list',
        });
        break;
      case 'success':
        response.status(HttpStatus.NO_CONTENT).send();
    }
  }

  deleteAlbum(id: string, response: Response) {
    const deleteAlbumFromFavoritesResult =
      this.dataBase.favorites.deleteAlbum(id);
    switch (deleteAlbumFromFavoritesResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity isn't favorite":
        response.status(HttpStatus.NOT_FOUND).send({
          message:
            'the album with the specified ID is not in the favorites list',
        });
        break;
      case 'success':
        response.status(HttpStatus.NO_CONTENT).send();
    }
  }

  deleteTrack(id: string, response: Response) {
    const deleteTrackFromFavoritesResult =
      this.dataBase.favorites.deleteTrack(id);
    switch (deleteTrackFromFavoritesResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity isn't favorite":
        response.status(HttpStatus.NOT_FOUND).send({
          message:
            'the track with the specified ID is not in the favorites list',
        });
        break;
      case 'success':
        response.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
