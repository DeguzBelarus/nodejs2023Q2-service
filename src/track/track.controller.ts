import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from 'src/dtoValidator/dto/track';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.trackService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.createTrack(createTrackDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return await this.trackService.updateTrack(id, updateTrackDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteTrack(@Param('id') id: string) {
    return await this.trackService.deleteTrack(id);
  }
}
