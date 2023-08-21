import { Injectable } from '@nestjs/common';

import { AlbumEntity } from 'src/album/album.entity';
import {
  CreateEntityResultType,
  ICreateAlbumDto,
  IUpdateAlbumDto,
  UpdateEntityResultType,
} from 'src/types/types';

@Injectable()
export class DtoAlbumValidatorService {
  createAlbumDtoValidate(
    albumData: ICreateAlbumDto,
  ): CreateEntityResultType<AlbumEntity> {
    if (
      typeof albumData.name === 'undefined' ||
      typeof albumData.year === 'undefined' ||
      typeof albumData.artistId === 'undefined'
    )
      return 'insufficient data for creation';
    if (
      typeof albumData.name !== 'string' ||
      typeof albumData.year !== 'number' ||
      (typeof albumData.artistId !== 'string' && albumData.artistId !== null)
    )
      return 'invalid data';
    if (!albumData.name.length) return 'invalid data';
    if (albumData.year === 0) return 'invalid data';
  }

  updateAlbumDtoValidate(
    artistData: IUpdateAlbumDto,
  ): UpdateEntityResultType<AlbumEntity> {
    if (
      typeof artistData.name === 'undefined' &&
      typeof artistData.year === 'undefined' &&
      typeof artistData.artistId === 'undefined'
    )
      return 'insufficient data for updating';
    if (
      (artistData.name && typeof artistData.name !== 'string') ||
      (artistData.year && typeof artistData.year !== 'number') ||
      (typeof artistData.artistId !== 'undefined' &&
        typeof artistData.artistId !== 'string' &&
        artistData.artistId !== null)
    )
      return 'invalid data';
    if (typeof artistData.name === 'string' && !artistData.name.length)
      return 'invalid data';
    if (typeof artistData.year === 'number' && artistData.year === 0)
      return 'invalid data';
  }
}
