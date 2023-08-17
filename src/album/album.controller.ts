import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';

import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/dtoValidator/dto/album';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const getAlbumByIdResult = await this.albumService.getById(id);
    switch (getAlbumByIdResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case "entity doesn't exist":
        throw new NotFoundException({
          message: 'the album with the specified ID was not found',
        });
      default:
        return getAlbumByIdResult;
    }
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    const albumCreationResult = await this.albumService.createAlbum(
      createAlbumDto,
    );
    switch (albumCreationResult) {
      case 'insufficient data for creation':
        throw new BadRequestException({
          message: 'insufficient data to create an album',
        });
      case 'invalid data':
        throw new BadRequestException({
          message: 'invalid data received',
        });
      default:
        return albumCreationResult;
    }
  }

  @Put(':id')
  async updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const albumUpdatingResult = await this.albumService.updateAlbum(
      id,
      updateAlbumDto,
    );
    switch (albumUpdatingResult) {
      case 'invalid uuid':
        throw new BadRequestException({
          message: 'invalid uuid',
        });
      case 'invalid data':
        throw new BadRequestException({
          message: 'invalid data received',
        });
      case 'insufficient data for updating':
        throw new BadRequestException({
          message: 'insufficient data to update an album',
        });
      case "entity doesn't exist":
        throw new NotFoundException({
          message: 'the album with the specified ID was not found',
        });
      default:
        return albumUpdatingResult;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') id: string) {
    const albumDeletionResult = await this.albumService.deleteAlbum(id);
    switch (albumDeletionResult) {
      case 'invalid uuid':
        throw new BadRequestException({
          message: 'invalid uuid',
        });
      case "entity doesn't exist":
        throw new NotFoundException({
          message: 'the album with the specified ID was not found',
        });
    }
  }
}
