import { Injectable } from '@nestjs/common';

import {
  CreateEntityResultType,
  ICreateTrackDto,
  IUpdateTrackDto,
  UpdateEntityResultType,
} from 'src/types/types';
import { TrackEntity } from 'src/track/track.entity';

@Injectable()
export class DtoTrackValidatorService {
  createTrackDtoValidate(
    trackData: ICreateTrackDto,
  ): CreateEntityResultType<TrackEntity> {
    if (
      typeof trackData.name === 'undefined' ||
      typeof trackData.duration === 'undefined' ||
      typeof trackData.artistId === 'undefined' ||
      typeof trackData.albumId === 'undefined'
    )
      return 'insufficient data for creation';
    if (
      typeof trackData.name !== 'string' ||
      typeof trackData.duration !== 'number' ||
      (typeof trackData.artistId !== 'string' &&
        trackData.artistId !== null &&
        typeof trackData.albumId !== 'string' &&
        trackData.albumId !== null)
    )
      return 'invalid data';
    if (!trackData.name.length) return 'invalid data';
    if (trackData.duration === 0) return 'invalid data';
  }

  updateTrackDtoValidate(
    trackData: IUpdateTrackDto,
  ): UpdateEntityResultType<TrackEntity> {
    if (
      typeof trackData.name === 'undefined' &&
      typeof trackData.duration === 'undefined' &&
      typeof trackData.artistId === 'undefined' &&
      typeof trackData.artistId === 'undefined'
    )
      return 'insufficient data for updating';
    if (
      (trackData.name && typeof trackData.name !== 'string') ||
      (trackData.duration && typeof trackData.duration !== 'number') ||
      (typeof trackData.artistId !== 'undefined' &&
        typeof trackData.artistId !== 'string' &&
        trackData.artistId !== null) ||
      (typeof trackData.albumId !== 'undefined' &&
        typeof trackData.albumId !== 'string' &&
        trackData.albumId !== null)
    )
      return 'invalid data';
    if (typeof trackData.name === 'string' && !trackData.name.length)
      return 'invalid data';
    if (typeof trackData.duration === 'number' && trackData.duration === 0)
      return 'invalid data';
  }
}
