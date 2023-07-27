import { validate as uuidValidate } from 'uuid';

import {
  CreateEntityResultType,
  DeleteEntityResultType,
  FindEntityByIdResultType,
  IAlbumModel,
  IArtistModel,
  ICreateTrackDto,
  ITrack,
  ITrackModel,
  IUpdateTrackDto,
  UpdateEntityResultType,
} from '../types';
import { Track } from '../schemas/track';

export class TrackModel implements ITrackModel {
  private table: Array<ITrack> = [];

  findAll(): Array<ITrack> {
    return this.table;
  }

  findById(id: string): FindEntityByIdResultType<ITrack> {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundTrack = this.table.find((entity) => entity.id === id);
    return !foundTrack ? "entity doesn't exist" : foundTrack;
  }

  create(
    artistsList: IArtistModel,
    albumsList: IAlbumModel,
    trackData: ICreateTrackDto,
  ): CreateEntityResultType<ITrack> {
    if (!artistsList && !albumsList) return 'invalid data';
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

    if (typeof trackData.artistId === 'string') {
      const foundArtist = artistsList.findById(trackData.artistId);
      if (
        foundArtist === 'invalid uuid' ||
        foundArtist === "entity doesn't exist"
      ) {
        return 'invalid data';
      }
    }
    if (typeof trackData.albumId === 'string') {
      const foundAlbum = albumsList.findById(trackData.albumId);
      if (
        foundAlbum === 'invalid uuid' ||
        foundAlbum === "entity doesn't exist"
      ) {
        return 'invalid data';
      }
    }
    const newTrack = new Track(
      trackData.name,
      trackData.artistId,
      trackData.albumId,
      trackData.duration,
    );
    this.table.push(newTrack);
    return newTrack;
  }

  update(
    id: string,
    artistsList: IArtistModel,
    albumsList: IAlbumModel,
    trackData: IUpdateTrackDto,
  ): UpdateEntityResultType<ITrack> {
    if (!artistsList && !albumsList) return 'invalid data';
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundTrack = this.table.find((track) => track.id === id);
    if (!foundTrack) {
      return "entity doesn't exist";
    }

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
    if (!trackData.name.length) return 'invalid data';

    if (typeof trackData.artistId === 'string') {
      const foundArtist = artistsList.findById(trackData.artistId);
      if (
        foundArtist === 'invalid uuid' ||
        foundArtist === "entity doesn't exist"
      ) {
        return 'invalid data';
      }
    }
    if (typeof trackData.albumId === 'string') {
      const foundAlbum = albumsList.findById(trackData.albumId);
      if (
        foundAlbum === 'invalid uuid' ||
        foundAlbum === "entity doesn't exist"
      ) {
        return 'invalid data';
      }
    }
    return foundTrack.updateData(trackData);
  }

  delete(id: string): DeleteEntityResultType {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundTrack = this.table.find((track) => track.id === id);
    if (!foundTrack) {
      return "entity doesn't exist";
    }
    this.table = this.table.filter((track) => track.id !== id);
    return 'success';
  }

  clearArtist(artistId: string): void {
    this.table.forEach((track) => {
      if (track.artistId === artistId) {
        track.updateData({ artistId: null });
      }
    });
  }

  clearAlbum(albumId: string): void {
    this.table.forEach((track) => {
      if (track.albumId === albumId) {
        track.updateData({ albumId: null });
      }
    });
  }
}
