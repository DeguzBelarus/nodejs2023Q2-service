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

import { ICreateAlbumDto, IUpdateAlbumDto } from 'src/types/types';
import { AlbumService } from './album.service';

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

  @Post()
  createAlbum(
    @Body() createAlbumDto: ICreateAlbumDto,
    @Res() response: Response,
  ) {
    return this.albumService.createAlbum(createAlbumDto, response);
  }

  @Put(':id')
  updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: IUpdateAlbumDto,
    @Res() response: Response,
  ) {
    return this.albumService.updateAlbum(id, updateAlbumDto, response);
  }

  @Delete(':id')
  deleteAlbum(@Param('id') id: string, @Res() response: Response) {
    return this.albumService.deleteAlbum(id, response);
  }
}
