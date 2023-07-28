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

import { ICreateArtistDto, IUpdateArtistDto } from 'src/types/types';
import { ArtistService } from './artist.service';

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

  @Post()
  createArtist(
    @Body() createArtistDto: ICreateArtistDto,
    @Res() response: Response,
  ) {
    return this.artistService.createArtist(createArtistDto, response);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateArtistDto: IUpdateArtistDto,
    @Res() response: Response,
  ) {
    return this.artistService.updateArtist(id, updateArtistDto, response);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string, @Res() response: Response) {
    return this.artistService.deleteArtist(id, response);
  }
}
