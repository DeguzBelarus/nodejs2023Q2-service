import {
  Controller,
  Param,
  Get,
  Post,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AuthGuard)
  @Get()
  get() {
    return this.favoritesService.get();
  }

  @UseGuards(AuthGuard)
  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    return await this.favoritesService.addArtist(id);
  }

  @UseGuards(AuthGuard)
  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    return await this.favoritesService.addAlbum(id);
  }

  @UseGuards(AuthGuard)
  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    return await this.favoritesService.addTrack(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async deleteArtist(@Param('id') id: string) {
    return await this.favoritesService.deleteArtist(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async deleteAlbum(@Param('id') id: string) {
    return await this.favoritesService.deleteAlbum(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async deleteTrack(@Param('id') id: string) {
    return await this.favoritesService.deleteTrack(id);
  }
}
