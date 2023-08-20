export type Nullable<T> = T | null;
export type LogNotificationType =
  | 'log'
  | 'error'
  | 'warn'
  | 'debug'
  | 'verbose';

export type LogSaveType =
  | 'log'
  | 'error'
  | 'warn'
  | 'debug'
  | 'verbose'
  | 'request'
  | 'response';

export interface ICreateUserDto {
  login: string;
  password: string;
}

export interface IUpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface ICreateArtistDto {
  name: string;
  grammy: boolean;
}

export interface IUpdateArtistDto {
  name?: string;
  grammy?: boolean;
}

export interface ICreateAlbumDto {
  name: string;
  year: number;
  artistId: Nullable<string>;
}

export interface IUpdateAlbumDto {
  name?: string;
  year?: number;
  artistId?: Nullable<string>;
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

export interface IUserSafe {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export type FindEntityByIdResultType<T> =
  | T
  | 'invalid uuid'
  | "entity doesn't exist";
export type UpdateUserPasswordResultType =
  | IUserSafe
  | 'invalid uuid'
  | 'invalid data'
  | "user doesn't exist"
  | "passwords don't match"
  | 'min login length is 3 characters'
  | 'max login length is 255 characters'
  | 'min password length is 3 characters'
  | 'max password length is 30 characters'
  | 'incorrect password data';
export type CreateUserResultType =
  | IUserSafe
  | 'login already in use'
  | 'insufficient data for creation'
  | 'invalid data'
  | 'min login length is 3 characters'
  | 'max login length is 255 characters'
  | 'min password length is 3 characters'
  | 'max password length is 30 characters'
  | 'incorrect password data';

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
