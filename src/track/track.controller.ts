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

import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from 'src/db/dto/track';

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

  @UsePipes(new ValidationPipe())
  @Post()
  createTrack(
    @Body() createTrackDto: CreateTrackDto,
    @Res() response: Response,
  ) {
    return this.trackService.createTrack(createTrackDto, response);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    @Res() response: Response,
  ) {
    return this.trackService.updateTrack(id, updateTrackDto, response);
  }

  @Delete(':id')
  deleteTrack(@Param('id') id: string, @Res() response: Response) {
    return this.trackService.deleteTrack(id, response);
  }
}
