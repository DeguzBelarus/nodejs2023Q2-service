import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

import db from '../db/db';

const {
  artists: artistModel,
  tracks: trackModel,
  albums: albumModel,
  favorites: favoritesModel,
} = db;

@Injectable()
export class FavoritesService {
  get() {
    return favoritesModel.get();
  }

  addArtist(id: string, response: Response) {
    const addArtistToFavoritesResult = favoritesModel.addArtist(
      id,
      artistModel,
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
    const addAlbumToFavoritesResult = favoritesModel.addAlbum(id, albumModel);
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
    const addTrackToFavoritesResult = favoritesModel.addTrack(id, trackModel);
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
    const deleteArtistFromFavoritesResult = favoritesModel.deleteArtist(id);
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
    const deleteAlbumFromFavoritesResult = favoritesModel.deleteAlbum(id);
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
    const deleteTrackFromFavoritesResult = favoritesModel.deleteTrack(id);
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
