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
  BadRequestException,
  NotFoundException,
  HttpCode,
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
  getById(@Param('id') id: string) {
    const getArtistByIdResult = this.artistService.getById(id);
    switch (getArtistByIdResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case "entity doesn't exist":
        throw new NotFoundException({
          message: 'the artist with the specified ID was not found',
        });
      default:
        return getArtistByIdResult;
    }
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    const artistCreationResult =
      this.artistService.createArtist(createArtistDto);
    switch (artistCreationResult) {
      case 'insufficient data for creation':
        throw new BadRequestException({
          message: 'insufficient data to create an artist',
        });
      case 'invalid data':
        throw new BadRequestException({
          message: 'invalid data received',
        });
      default:
        return artistCreationResult;
    }
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artistUpdatingResult = this.artistService.updateArtist(
      id,
      updateArtistDto,
    );
    switch (artistUpdatingResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case 'invalid data':
        throw new BadRequestException({ message: 'invalid data received' });
      case 'insufficient data for updating':
        throw new BadRequestException({
          message: 'insufficient data to update an artist',
        });
      case "entity doesn't exist":
        throw new NotFoundException({
          message: 'the artist with the specified ID was not found',
        });
      default:
        return artistUpdatingResult;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    const artistDeletionResult = this.artistService.deleteArtist(id);
    switch (artistDeletionResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case "entity doesn't exist":
        throw new NotFoundException({
          message: 'the user with the specified ID was not found',
        });
    }
  }
}
