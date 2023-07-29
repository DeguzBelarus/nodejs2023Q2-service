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

import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from 'src/db/dto/artist';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string, @Res() response: Response) {
    const getArtistByIdResult = this.artistService.getById(id);
    switch (getArtistByIdResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the artist with the specified ID was not found' });
        break;
      default:
        response.status(HttpStatus.OK).send(getArtistByIdResult);
    }
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createArtist(
    @Body() createArtistDto: CreateArtistDto,
    @Res() response: Response,
  ) {
    const artistCreationResult =
      this.artistService.createArtist(createArtistDto);
    switch (artistCreationResult) {
      case 'insufficient data for creation':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'insufficient data to create an artist' });
        break;
      case 'invalid data':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid data received' });
        break;
      default:
        response.status(HttpStatus.CREATED).send(artistCreationResult);
    }
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
    @Res() response: Response,
  ) {
    const artistUpdatingResult = this.artistService.updateArtist(
      id,
      updateArtistDto,
    );
    switch (artistUpdatingResult) {
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
          .send({ message: 'insufficient data to update an artist' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the artist with the specified ID was not found' });
        break;
      default:
        response.status(HttpStatus.OK).send(artistUpdatingResult);
    }
  }

  @Delete(':id')
  deleteArtist(@Param('id') id: string, @Res() response: Response) {
    const artistDeletionResult = this.artistService.deleteArtist(id);
    switch (artistDeletionResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the user with the specified ID was not found' });
        break;
      case 'success':
        response.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
