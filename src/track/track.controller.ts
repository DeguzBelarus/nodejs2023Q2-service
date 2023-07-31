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
  getById(@Param('id') id: string) {
    const getTrackByIdResult = this.trackService.getById(id);
    switch (getTrackByIdResult) {
      case 'invalid uuid':
        throw new BadRequestException({ message: 'invalid uuid' });
      case "entity doesn't exist":
        throw new NotFoundException({
          message: 'the track with the specified ID was not found',
        });
      default:
        return getTrackByIdResult;
    }
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    const trackCreationResult = this.trackService.createTrack(createTrackDto);
    switch (trackCreationResult) {
      case 'insufficient data for creation':
        throw new BadRequestException({
          message: 'insufficient data to create a track',
        });
      case 'invalid data':
        throw new BadRequestException({
          message: 'invalid data received',
        });
      default:
        return trackCreationResult;
    }
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    const trackUpdatingResult = this.trackService.updateTrack(
      id,
      updateTrackDto,
    );
    switch (trackUpdatingResult) {
      case 'invalid uuid':
        throw new BadRequestException({
          message: 'invalid uuid',
        });
      case 'invalid data':
        throw new BadRequestException({
          message: 'invalid data received',
        });
      case 'insufficient data for updating':
        throw new BadRequestException({
          message: 'insufficient data to update a track',
        });
      case "entity doesn't exist":
        throw new NotFoundException({
          message: 'the track with the specified ID was not found',
        });
      default:
        return trackUpdatingResult;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    const trackDeletionResult = this.trackService.deleteTrack(id);
    switch (trackDeletionResult) {
      case 'invalid uuid':
        throw new BadRequestException({
          message: 'invalid uuid',
        });
      case "entity doesn't exist":
        throw new NotFoundException({
          message: 'the track with the specified ID was not found',
        });
    }
  }
}
