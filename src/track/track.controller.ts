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
    const getTrackByIdResult = this.trackService.getById(id);
    switch (getTrackByIdResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the track with the specified ID was not found' });
        break;
      default:
        response.status(HttpStatus.OK).send(getTrackByIdResult);
    }
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createTrack(
    @Body() createTrackDto: CreateTrackDto,
    @Res() response: Response,
  ) {
    const trackCreationResult = this.trackService.createTrack(createTrackDto);
    switch (trackCreationResult) {
      case 'insufficient data for creation':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'insufficient data to create a track' });
        break;
      case 'invalid data':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid data received' });
        break;
      default:
        response.status(HttpStatus.CREATED).send(trackCreationResult);
    }
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    @Res() response: Response,
  ) {
    const trackUpdatingResult = this.trackService.updateTrack(
      id,
      updateTrackDto,
    );
    switch (trackUpdatingResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case 'invalid data':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid data received' });
        break;
      case 'insufficient data for updating':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'insufficient data to update a track' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the track with the specified ID was not found' });
        break;
      default:
        response.status(HttpStatus.OK).send(trackUpdatingResult);
    }
  }

  @Delete(':id')
  deleteTrack(@Param('id') id: string, @Res() response: Response) {
    const trackDeletionResult = this.trackService.deleteTrack(id);
    switch (trackDeletionResult) {
      case 'invalid uuid':
        response
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'invalid uuid' });
        break;
      case "entity doesn't exist":
        response
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'the track with the specified ID was not found' });
        break;
      case 'success':
        response.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
