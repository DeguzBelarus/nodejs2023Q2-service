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

import { ICreateTrackDto, IUpdateTrackDto } from 'src/types/types';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string, @Res() response: Response) {
    return this.trackService.getById(id, response);
  }

  @Post()
  createTrack(
    @Body() createTrackDto: ICreateTrackDto,
    @Res() response: Response,
  ) {
    return this.trackService.createTrack(createTrackDto, response);
  }

  @Put(':id')
  updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: IUpdateTrackDto,
    @Res() response: Response,
  ) {
    return this.trackService.updateTrack(id, updateTrackDto, response);
  }

  @Delete(':id')
  deleteTrack(@Param('id') id: string, @Res() response: Response) {
    return this.trackService.deleteTrack(id, response);
  }
}
