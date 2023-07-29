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
    return this.artistService.getById(id, response);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createArtist(
    @Body() createArtistDto: CreateArtistDto,
    @Res() response: Response,
  ) {
    return this.artistService.createArtist(createArtistDto, response);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
    @Res() response: Response,
  ) {
    return this.artistService.updateArtist(id, updateArtistDto, response);
  }

  @Delete(':id')
  deleteArtist(@Param('id') id: string, @Res() response: Response) {
    return this.artistService.deleteArtist(id, response);
  }
}
