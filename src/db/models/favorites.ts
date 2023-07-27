import { validate as uuidValidate } from 'uuid';

import {
  AddFavoriteResultType,
  DeleteFavoriteResultType,
  IAlbum,
  IAlbumModel,
  IArtist,
  IArtistModel,
  IFavoritesModel,
  IFavoritesResponse,
  ITrack,
  ITrackModel,
} from '../types';

export class FavoritesModel implements IFavoritesModel {
  artists: Array<IArtist> = [];
  albums: Array<IAlbum> = [];
  tracks: Array<ITrack> = [];

  get(): IFavoritesResponse {
    return { albums: this.albums, artists: this.artists, tracks: this.tracks };
  }

  addTrack(id: string, tracksList: ITrackModel): AddFavoriteResultType {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundTrack = tracksList.findById(id);
    if (foundTrack === "entity doesn't exist") {
      return "entity doesn't exist";
    }
    this.tracks.push(foundTrack as ITrack);
    return 'success';
  }

  addAlbum(id: string, albumsList: IAlbumModel): AddFavoriteResultType {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundAlbum = albumsList.findById(id);
    if (foundAlbum === "entity doesn't exist") {
      return "entity doesn't exist";
    }
    this.albums.push(foundAlbum as IAlbum);
    return 'success';
  }

  addArtist(id: string, artistsList: IArtistModel): AddFavoriteResultType {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundArtist = artistsList.findById(id);
    if (foundArtist === "entity doesn't exist") {
      return "entity doesn't exist";
    }
    this.artists.push(foundArtist as IArtist);
    return 'success';
  }

  deleteTrack(id: string): DeleteFavoriteResultType {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundTrack = this.tracks.find((track) => track.id === id);
    if (foundTrack) {
      this.tracks = this.tracks.filter((track) => track.id !== id);
      return 'success';
    }
    return "entity isn't favorite";
  }

  deleteAlbum(id: string): DeleteFavoriteResultType {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundAlbum = this.albums.find((album) => album.id === id);
    if (foundAlbum) {
      this.albums = this.albums.filter((album) => album.id !== id);
      return 'success';
    }
    return "entity isn't favorite";
  }

  deleteArtist(id: string): DeleteFavoriteResultType {
    if (!uuidValidate(id)) return 'invalid uuid';
    const foundArtist = this.artists.find((artist) => artist.id === id);
    if (foundArtist) {
      this.artists = this.artists.filter((artist) => artist.id !== id);
      return 'success';
    }
    return "entity isn't favorite";
  }
}
