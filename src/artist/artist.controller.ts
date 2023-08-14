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

import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from 'src/dtoValidator/dto/artist';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const getArtistByIdResult = await this.artistService.getById(id);
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
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    const artistCreationResult = await this.artistService.createArtist(
      createArtistDto,
    );
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
  async updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artistUpdatingResult = await this.artistService.updateArtist(
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
  async deleteArtist(@Param('id') id: string) {
    const artistDeletionResult = await this.artistService.deleteArtist(id);
    switch (artistDeletionResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case "entity doesn't exist":
        throw new NotFoundException({
          message: 'the artist with the specified ID was not found',
        });
    }
  }
}
