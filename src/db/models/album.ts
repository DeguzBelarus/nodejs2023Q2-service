import { validate as uuidValidate } from 'uuid';

import {
  CreateEntityResultType,
  DeleteEntityResultType,
  FindEntityByIdResultType,
  IAlbum,
  IAlbumModel,
  IArtistModel,
  ICreateAlbumDto,
  ITrackModel,
  IUpdateAlbumDto,
  UpdateEntityResultType,
} from '../types';
import { Album } from '../schemas/album';

export class AlbumModel implements IAlbumModel {
  private table: Array<IAlbum> = [];

  findAll(): Array<IAlbum> {
    return this.table;
  }

  findById(id: string): FindEntityByIdResultType<IAlbum> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundAlbum = this.table.find((entity) => entity.id === id);
    return !foundAlbum ? "entity doesn't exist" : foundAlbum;
  }

  create(
    artistsList: IArtistModel,
    albumData: ICreateAlbumDto,
  ): CreateEntityResultType<IAlbum> {
    if (!artistsList) return 'invalid data';
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

    if (typeof albumData.artistId === 'string') {
      const foundArtist = artistsList.findById(albumData.artistId);
      if (
        foundArtist === 'invalid uuid' ||
        foundArtist === "entity doesn't exist"
      ) {
        return 'invalid data';
      }
    } else {
      const newAlbum = new Album(
        albumData.name,
        albumData.year,
        albumData.artistId,
      );
      this.table.push(newAlbum);
      return newAlbum;
    }
  }

  update(
    id: string,
    artistsList: IArtistModel,
    albumData: IUpdateAlbumDto,
  ): UpdateEntityResultType<IAlbum> {
    if (!artistsList) return 'invalid data';
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundAlbum = this.table.find((album) => album.id === id);
    if (!foundAlbum) {
      return "entity doesn't exist";
    }

    if (
      typeof albumData.name === 'undefined' &&
      typeof albumData.year === 'undefined' &&
      typeof albumData.artistId === 'undefined'
    )
      return 'insufficient data for updating';
    if (
      (albumData.name && typeof albumData.name !== 'string') ||
      (albumData.year && typeof albumData.year !== 'number') ||
      (typeof albumData.artistId !== 'undefined' &&
        typeof albumData.artistId !== 'string' &&
        albumData.artistId !== null)
    )
      return 'invalid data';
    if (typeof albumData.name === 'string' && !albumData.name.length)
      return 'invalid data';
    if (typeof albumData.artistId === 'string') {
      const foundArtist = artistsList.findById(albumData.artistId);
      if (
        foundArtist === 'invalid uuid' ||
        foundArtist === "entity doesn't exist"
      ) {
        return 'invalid data';
      }
      return foundAlbum.updateData(albumData);
    }
  }

  delete(id: string, tracksList: ITrackModel): DeleteEntityResultType {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundAlbum = this.table.find((album) => album.id === id);
    if (!foundAlbum) {
      return "entity doesn't exist";
    }
    this.table = this.table.filter((album) => album.id !== id);
    tracksList.clearAlbum(foundAlbum.id);
    return 'success';
  }

  clearArtist(artistId: string): void {
    this.table.forEach((album) => {
      if (album.artistId === artistId) {
        album.updateData({ artistId: null });
      }
    });
  }
}
