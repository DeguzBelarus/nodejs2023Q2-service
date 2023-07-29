import {
  Controller,
  Res,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

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
  getById(@Param('id') id: string, @Res() response: Response) {
    const getAlbumByIdResult = this.albumService.getById(id);
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

  @UsePipes(new ValidationPipe())
  @Post()
  createAlbum(
    @Body() createAlbumDto: CreateAlbumDto,
    @Res() response: Response,
  ) {
    const albumCreationResult = this.albumService.createAlbum(createAlbumDto);
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

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Res() response: Response,
  ) {
    const albumUpdatingResult = this.albumService.updateAlbum(
      id,
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

  @Delete(':id')
  deleteAlbum(@Param('id') id: string, @Res() response: Response) {
    const albumDeletionResult = this.albumService.deleteAlbum(id);
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
