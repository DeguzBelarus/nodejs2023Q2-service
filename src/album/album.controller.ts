import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';

import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/db/dto/album';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const getAlbumByIdResult = this.albumService.getById(id);
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

  @UsePipes(new ValidationPipe())
  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    const albumCreationResult = this.albumService.createAlbum(createAlbumDto);
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

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    const albumUpdatingResult = this.albumService.updateAlbum(
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
  deleteAlbum(@Param('id') id: string) {
    const albumDeletionResult = this.albumService.deleteAlbum(id);
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
