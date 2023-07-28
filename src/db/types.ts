import {
  ICreateAlbumDto,
  ICreateArtistDto,
  ICreateUserDto,
  IUpdateAlbumDto,
  IUpdateArtistDto,
  IUpdatePasswordDto,
  Nullable,
} from '../types/types';

export type FindEntityByIdResultType<T> =
  | T
  | 'invalid uuid'
  | "entity doesn't exist";
export type UpdateUserPasswordResultType =
  | IUserSafe
  | 'invalid uuid'
  | 'invalid data'
  | "user doesn't exist"
  | "passwords don't match";
export type CreateUserResultType =
  | IUserSafe
  | 'login already in use'
  | 'insufficient data for creation'
  | 'invalid data';
export type CreateEntityResultType<T> =
  | T
  | 'insufficient data for creation'
  | 'invalid data';
export type UpdateEntityResultType<T> =
  | T
  | 'invalid uuid'
  | 'insufficient data for updating'
  | "entity doesn't exist"
  | 'invalid data';
export type DeleteEntityResultType =
  | 'success'
  | 'invalid uuid'
  | "entity doesn't exist";
export type AddFavoriteResultType =
  | 'success'
  | 'invalid uuid'
  | "entity doesn't exist";
export type DeleteFavoriteResultType =
  | 'success'
  | 'invalid uuid'
  | "entity isn't favorite";

export interface IUserSafe {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface IUser extends IUserSafe {
  password: string;
  updatePassword(newPassword: string): IUserSafe;
}

export interface IArtist {
  id: string;
  name: string;
  grammy: boolean;
  updateData(artistData: IUpdateArtistDto): IArtist;
}

export interface ITrack {
  id: string;
  name: string;
  artistId: Nullable<string>;
  albumId: Nullable<string>;
  duration: number;
  updateData(trackData: IUpdateTrackDto): ITrack;
}

export interface ICreateTrackDto {
  name: string;
  artistId: Nullable<string>;
  albumId: Nullable<string>;
  duration: number;
}

export interface IUpdateTrackDto {
  name?: string;
  artistId?: Nullable<string>;
  albumId?: Nullable<string>;
  duration?: number;
}

export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: Nullable<string>;
  updateData(albumData: IUpdateAlbumDto): IAlbum;
}

export interface IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface IFavoritesResponse {
  artists: Array<IArtist>;
  albums: Array<IAlbum>;
  tracks: Array<ITrack>;
}

export interface IUserModel {
  findAll(): Array<IUserSafe>;
  findById(id: string): FindEntityByIdResultType<IUserSafe>;
  create(userData: ICreateUserDto): CreateUserResultType;
  updatePassword(
    id: string,
    passwordsData: IUpdatePasswordDto,
  ): UpdateUserPasswordResultType;
  delete(id: string): DeleteEntityResultType;
}

export interface IArtistModel {
  findAll(): Array<IArtist>;
  findById(id: string): FindEntityByIdResultType<IArtist>;
  create(artistData: ICreateArtistDto): CreateEntityResultType<IArtist>;
  update(
    id: string,
    artistData: IUpdateArtistDto,
  ): UpdateEntityResultType<IArtist>;
  delete(
    id: string,
    tracksList: ITrackModel,
    albumsList: IAlbumModel,
  ): DeleteEntityResultType;
}

export interface IAlbumModel {
  findAll(): Array<IAlbum>;
  findById(id: string): FindEntityByIdResultType<IAlbum>;
  create(
    artistsList: IArtistModel,
    albumData: ICreateAlbumDto,
  ): CreateEntityResultType<IAlbum>;
  update(
    id: string,
    artistsList: IArtistModel,
    albumData: IUpdateAlbumDto,
  ): UpdateEntityResultType<IAlbum>;
  delete(id: string, tracksList: ITrackModel): DeleteEntityResultType;
  clearArtist(artistId: string): void;
}

export interface ITrackModel {
  findAll(): Array<ITrack>;
  findById(id: string): FindEntityByIdResultType<ITrack>;
  create(
    artistsList: IArtistModel,
    albumsList: IAlbumModel,
    trackData: ICreateTrackDto,
  ): CreateEntityResultType<ITrack>;
  update(
    id: string,
    artistsList: IArtistModel,
    albumsList: IAlbumModel,
    trackData: IUpdateTrackDto,
  ): UpdateEntityResultType<ITrack>;
  delete(id: string): DeleteEntityResultType;
  clearArtist(artistId: string): void;
  clearAlbum(albumId: string): void;
}

export interface IFavoritesModel extends IFavoritesResponse {
  get(): IFavoritesResponse;
  addTrack(id: string, tracksList: ITrackModel): AddFavoriteResultType;
  addAlbum(id: string, albumsList: IAlbumModel): AddFavoriteResultType;
  addArtist(id: string, artistsList: IArtistModel): AddFavoriteResultType;
  deleteTrack(id: string): DeleteFavoriteResultType;
  deleteAlbum(id: string): DeleteFavoriteResultType;
  deleteArtist(id: string): DeleteFavoriteResultType;
}

export interface IDb {
  users: IUserModel;
  artists: IArtistModel;
  albums: IAlbumModel;
  tracks: ITrackModel;
  favorites: IFavoritesModel;
}
