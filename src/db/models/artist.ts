import { validate as uuidValidate } from 'uuid';

import {
  CreateEntityResultType,
  DeleteEntityResultType,
  FindEntityByIdResultType,
  IAlbumModel,
  IArtist,
  IArtistModel,
  ICreateArtistDto,
  ITrackModel,
  IUpdateArtistDto,
  UpdateEntityResultType,
} from '../types';
import { Artist } from '../schemas/artist';

export class ArtistModel implements IArtistModel {
  private table: Array<IArtist> = [];

  findAll(): Array<IArtist> {
    return this.table;
  }

  findById(id: string): FindEntityByIdResultType<IArtist> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundArtist = this.table.find((entity) => entity.id === id);
    return !foundArtist ? "entity doesn't exist" : foundArtist;
  }

  create(artistData: ICreateArtistDto): CreateEntityResultType<IArtist> {
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
    const newArtist = new Artist(artistData.name, artistData.grammy);
    this.table.push(newArtist);
    return newArtist;
  }

  update(
    id: string,
    artistData: IUpdateArtistDto,
  ): UpdateEntityResultType<IArtist> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundArtist = this.table.find((artist) => artist.id === id);
    if (!foundArtist) {
      return "entity doesn't exist";
    }
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
    return foundArtist.updateData(artistData);
  }

  delete(
    id: string,
    tracksList: ITrackModel,
    albumsList: IAlbumModel,
  ): DeleteEntityResultType {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundArtist = this.table.find((artist) => artist.id === id);
    if (!foundArtist) {
      return "entity doesn't exist";
    }
    this.table === this.table.filter((artist) => artist.id !== id);
    tracksList.clearArtist(foundArtist.id);
    albumsList.clearArtist(foundArtist.id);
    return 'success';
  }
}
