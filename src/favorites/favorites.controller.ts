import {
  Controller,
  Param,
  Get,
  Post,
  Delete,
  HttpStatus,
  UnprocessableEntityException,
  BadRequestException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  get() {
    return this.favoritesService.get();
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    const addArtistToFavoritesResult = await this.favoritesService.addArtist(
      id,
    );
    switch (addArtistToFavoritesResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case "entity doesn't exist":
        throw new UnprocessableEntityException({
          message: 'the artist with the specified ID was not found',
        });
    }
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    const addAlbumToFavoritesResult = await this.favoritesService.addAlbum(id);
    switch (addAlbumToFavoritesResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case "entity doesn't exist":
        throw new UnprocessableEntityException({
          message: 'the album with the specified ID was not found',
        });
    }
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    const addTrackToFavoritesResult = await this.favoritesService.addTrack(id);
    switch (addTrackToFavoritesResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case "entity doesn't exist":
        throw new UnprocessableEntityException({
          message: 'the track with the specified ID was not found',
        });
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') id: string) {
    const deleteArtistFromFavoritesResult =
      await this.favoritesService.deleteArtist(id);
    switch (deleteArtistFromFavoritesResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case "entity isn't favorite":
        throw new NotFoundException({
          message:
            'the artist with the specified ID is not in the favorites list',
        });
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') id: string) {
    const deleteAlbumFromFavoritesResult =
      await this.favoritesService.deleteAlbum(id);
    switch (deleteAlbumFromFavoritesResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case "entity isn't favorite":
        throw new NotFoundException({
          message:
            'the album with the specified ID is not in the favorites list',
        });
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') id: string) {
    const deleteTrackFromFavoritesResult =
      await this.favoritesService.deleteTrack(id);
    switch (deleteTrackFromFavoritesResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case "entity isn't favorite":
        throw new NotFoundException({
          message:
            'the track with the specified ID is not in the favorites list',
        });
    }
  }
}
