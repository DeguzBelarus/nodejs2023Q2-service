import { Injectable } from '@nestjs/common';

import { ArtistEntity } from 'src/artist/artist.entity';
import {
  CreateEntityResultType,
  ICreateArtistDto,
  IUpdateArtistDto,
  UpdateEntityResultType,
} from 'src/types/types';

@Injectable()
export class DtoArtistValidatorService {
  createArtistDtoValidate(
    artistData: ICreateArtistDto,
  ): CreateEntityResultType<ArtistEntity> {
    if (
      typeof artistData.grammy === 'undefined' ||
      typeof artistData.name === 'undefined'
    )
      return 'insufficient data for creation';
    if (
      typeof artistData.grammy !== 'boolean' ||
      typeof artistData.name !== 'string'
    )
      return 'invalid data';
    if (!artistData.name.length) return 'invalid data';
  }

  updateArtistDtoValidate(
    artistData: IUpdateArtistDto,
  ): UpdateEntityResultType<ArtistEntity> {
    if (
      typeof artistData.grammy === 'undefined' &&
      typeof artistData.name === 'undefined'
    )
      return 'insufficient data for updating';
    if (
      (artistData.grammy && typeof artistData.grammy !== 'boolean') ||
      (artistData.name && typeof artistData.name !== 'string')
    )
      return 'invalid data';
    if (typeof artistData.name === 'string' && !artistData.name.length)
      return 'invalid data';
  }
}
