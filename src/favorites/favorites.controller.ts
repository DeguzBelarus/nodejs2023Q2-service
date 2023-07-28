import {
  Controller,
  Res,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
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
    return this.favoritesService.addArtist(id, response);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string, @Res() response: Response) {
    return this.favoritesService.addAlbum(id, response);
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string, @Res() response: Response) {
    return this.favoritesService.addTrack(id, response);
  }

  @Delete('artist/:id')
  deleteArtist(@Param('id') id: string, @Res() response: Response) {
    return this.favoritesService.deleteArtist(id, response);
  }

  @Delete('album/:id')
  deleteAlbum(@Param('id') id: string, @Res() response: Response) {
    return this.favoritesService.deleteAlbum(id, response);
  }

  @Delete('track/:id')
  deleteTrack(@Param('id') id: string, @Res() response: Response) {
    return this.favoritesService.deleteTrack(id, response);
  }
}
