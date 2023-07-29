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
    return this.albumService.getById(id, response);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createAlbum(
    @Body() createAlbumDto: CreateAlbumDto,
    @Res() response: Response,
  ) {
    return this.albumService.createAlbum(createAlbumDto, response);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Res() response: Response,
  ) {
    return this.albumService.updateAlbum(id, updateAlbumDto, response);
  }

  @Delete(':id')
  deleteAlbum(@Param('id') id: string, @Res() response: Response) {
    return this.albumService.deleteAlbum(id, response);
  }
}
