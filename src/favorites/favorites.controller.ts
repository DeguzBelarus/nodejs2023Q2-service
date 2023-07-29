import {
  Controller,
  Res,
  Param,
  Get,
  Post,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  get() {
    return this.favoritesService.get();
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string, @Res() response: Response) {
    const addArtistToFavoritesResult = this.favoritesService.addArtist(id);
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

  @Post('album/:id')
  addAlbum(@Param('id') id: string, @Res() response: Response) {
    const addAlbumToFavoritesResult = this.favoritesService.addAlbum(id);
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

  @Post('track/:id')
  addTrack(@Param('id') id: string, @Res() response: Response) {
    const addTrackToFavoritesResult = this.favoritesService.addTrack(id);
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

  @Delete('artist/:id')
  deleteArtist(@Param('id') id: string, @Res() response: Response) {
    const deleteArtistFromFavoritesResult =
      this.favoritesService.deleteArtist(id);
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

  @Delete('album/:id')
  deleteAlbum(@Param('id') id: string, @Res() response: Response) {
    const deleteAlbumFromFavoritesResult =
      this.favoritesService.deleteAlbum(id);
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

  @Delete('track/:id')
  deleteTrack(@Param('id') id: string, @Res() response: Response) {
    const deleteTrackFromFavoritesResult =
      this.favoritesService.deleteTrack(id);
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
