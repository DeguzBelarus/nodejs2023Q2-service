import { v4 as uuidv4 } from 'uuid';

import {
  IAlbum,
  IArtist,
  ITrack,
  IUpdateAlbumDto,
  IUpdateArtistDto,
  IUpdateTrackDto,
  IUser,
  IUserSafe,
  Nullable,
} from './types';

export class User implements IUser {
  id = uuidv4();
  login: string;
  password: string;
  version = 1;
  createdAt = Date.now();
  updatedAt = 0;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.updatedAt = this.createdAt;
  }

  updatePassword(newPassword: string): IUserSafe {
    this.password = newPassword;
    this.updatedAt = Date.now();
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class Artist implements IArtist {
  id = uuidv4();
  name: string;
  grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.name = name;
    this.grammy = grammy;
  }

  updateData(artistData: IUpdateArtistDto): IArtist {
    if (artistData.name) {
      this.name = artistData.name;
    }
    if (typeof artistData.grammy === 'boolean') {
      this.grammy = artistData.grammy;
    }
    return this;
  }
}

export class Album implements IAlbum {
  id = uuidv4();
  name: string;
  year: number;
  artistId: Nullable<string>;

  constructor(name: string, year: number, artistId: Nullable<string>) {
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  updateData(albumData: IUpdateAlbumDto): IAlbum {
    if (albumData.name) {
      this.name = albumData.name;
    }
    if (albumData.year) {
      this.year = albumData.year;
    }
    if (albumData.artistId === null || typeof albumData.artistId === 'string') {
      this.artistId = albumData.artistId;
    }
    return this;
  }
}

export class Track implements ITrack {
  id = uuidv4();
  name: string;
  artistId: Nullable<string>;
  albumId: Nullable<string>;
  duration: number;

  constructor(
    name: string,
    artistId: Nullable<string>,
    albumId: Nullable<string>,
    duration: number,
  ) {
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }

  updateData(trackData: IUpdateTrackDto): ITrack {
    if (trackData.name) {
      this.name = trackData.name;
    }
    if (trackData.duration) {
      this.duration = trackData.duration;
    }
    if (trackData.albumId !== undefined) {
      this.albumId = trackData.albumId;
    }
    if (trackData.artistId !== undefined) {
      this.artistId = trackData.artistId;
    }
    return this;
  }
}
