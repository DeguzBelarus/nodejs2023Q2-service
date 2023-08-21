import { Nullable } from 'src/types/types';

export interface IUserEntity {
  id: string;
  login: string;
  password: string;
  version: number;
}

export interface IArtistEntity {
  id: string;
  name: string;
  grammy: boolean;
}

export interface IAlbumEntity {
  id: string;
  name: string;
  year: number;
  artistId: Nullable<string>;
}

export interface ITrackEntity {
  id: string;
  name: string;
  duration: number;
  artistId: Nullable<string>;
  albumId: Nullable<string>;
}
